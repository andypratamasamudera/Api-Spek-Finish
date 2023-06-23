import {Prop,Schema,SchemaFactory} from '@nestjs/mongoose';
import { Types,ObjectId } from "mongoose";

@Schema({
    timestamps: true
})
export class Article{
 @Prop()
 title: string
 @Prop()
 description: string
 @Prop()
 userId: Types.ObjectId
}

export const ArticleSchema = SchemaFactory.createForClass(Article)