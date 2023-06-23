import { IsString, IsNotEmpty } from "class-validator";
import { Types } from 'mongoose';

export class CreateArticleDto{

    @IsString()
    @IsNotEmpty()
    readonly title:string;
    
    @IsString()
    @IsNotEmpty()
    readonly description:string;

    @IsNotEmpty()
    readonly userId: Types.ObjectId;
}