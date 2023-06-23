import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from './entities/article.schema';

@Injectable()
export class ArticleService {
  private readonly secretKey = 'Token-Secret';

  constructor(@InjectModel(Article.name) 
  private articleModel:Model<Article>
  ){}

  async createArticle(user: any, createArticleDto: CreateArticleDto): Promise<any | Article> {
    try {
      const { title, description } = createArticleDto;
      const newArticle = new this.articleModel({
        title,
        description,
        userId : user.id,
      });
      const savedArticle = await newArticle.save();
      const responeGetData = await this.articleModel.findById(savedArticle._id).exec();
      return responeGetData;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async getAllDataOwnUser(user: any): Promise<any | Article[]> {
    try{
      const respone = await this.articleModel.find({ userId : user.id }).exec();
      return {docs: respone};
    }catch(error){
      throw new UnauthorizedException('Maaf Ini Error')
    }
  }
  
  async update(user: any, articleId: string, updateArticleDto: UpdateArticleDto): Promise<any | Article[]> {
    try {
      const searchArtikelId = await this.articleModel.findOne({ _id: articleId }).exec();
  
      if (!searchArtikelId) {
        return ('Artikel Id Tidak Di Temukan');
      } else {
        const validasidata = await this.articleModel.findOne({ userId: user.id , _id: articleId})
        if(validasidata){
          return this.articleModel.findByIdAndUpdate(articleId,updateArticleDto,{new:true});
        }else{
          return ('Maaf Anda Bukan Pemilik Artikel Ini')
        }
      }
    } catch (error) {
      const searchArtikelId = await this.articleModel.findOne({ _id: articleId }).exec();
        if (!searchArtikelId) {
        return ('Maaf IdArtikel Tidak Ditemukan Pastikan Juga Token Sudah Benar');
      } else if(searchArtikelId){
        const warning = 'Maaf Token Salah Sehingga IdUser Tidak Bisa Di Temukan Tetapi IdArtikel Telah Ditemukan';
        return warning;
      }
    }
  }

  async delete(user: any, articleId: string): Promise<any | Article[]> {
    try {
      const searchArtikelId = await this.articleModel.findOne({ _id: articleId }).exec();

      if (!searchArtikelId) {
        return ('Artikel Id Tidak Di Temukan');
      } else {
        const validasidata = await this.articleModel.findOne({ userId: user.id , _id: articleId})
        if(validasidata){
          return this.articleModel.findByIdAndDelete(articleId);
        }else{
          return ('Maaf Anda Bukan Pemilik Artikel Ini')
        }
      }
    } catch (error) {
      const searchArtikelId = await this.articleModel.findOne({ _id: articleId }).exec();
        if (!searchArtikelId) {
        return ('Maaf IdArtikel Tidak Ditemukan Pastikan Juga Token Sudah Benar');
      } else if(searchArtikelId){
        const warning = 'Maaf Token Salah Sehingga IdUser Tidak Bisa Di Temukan Tetapi IdArtikel Telah Ditemukan';
        return warning;
      } else {
        return ("Maaf Anda Bukan Pemilik Artikel Ini");
      }
    }
  }
}