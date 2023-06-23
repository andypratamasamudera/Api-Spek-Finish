import { Controller, Get, Post, Body, UseGuards, Param, Delete, Put, Request, UnauthorizedException } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { AuthGuard } from 'src/users/auth/auth.guard';

@Controller('/article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post('/user/article')
  @UseGuards(AuthGuard)
  async createArticle(@Request() req ,@Body()createArticleDto: CreateArticleDto) {
    try{
      const user = req.user;
      const getDataUserId = await this.articleService.createArticle(user, createArticleDto);
      return getDataUserId;
    }catch(error){
      throw new UnauthorizedException('Token Salah');
    }
  }

  @Get('/user/article')
  @UseGuards(AuthGuard)
    async GetArticleUser(@Request() req) : Promise<any[]> {
      try{
        const user = req.user;
        const getDataUserId = await this.articleService.getAllDataOwnUser(user);
        return getDataUserId;
      }catch(error){
        throw new UnauthorizedException('Token Salah');
      }
  }

@Put('user/article/:id')
@UseGuards(AuthGuard)
  async UpdateArticleUser(@Request() req ,@Param('id') articleId : string, @Body() updateArticleDto: UpdateArticleDto) : Promise<any[]> {
      const user = req.user;
      const getDataUserId = await this.articleService.update(user, articleId, updateArticleDto);
      return getDataUserId;
  }

@Delete('user/article/:id')
@UseGuards(AuthGuard)
async DeleteArticleUser(@Request() req ,@Param('id') articleId : string) : Promise<any[]> {
  const user = req.user;
  const getDataUserId = await this.articleService.delete(user, articleId );
  return getDataUserId;
}
}
