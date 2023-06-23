import { Document, ObjectId, Types } from "mongoose";

export interface IArticle extends Document{
    readonly title:string;
    readonly description:string;
    readonly userId:Types.ObjectId;
    
}