import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { Article, ArticleSchema } from './entities/article.schema';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI,{dbName:"ApiSpek"}),
    MongooseModule.forFeature([{ name:Article.name, schema : ArticleSchema }]),
  ],
  controllers: [ArticleController],
  providers: [ArticleService, JwtService]
})
export class ArticleModule {}
