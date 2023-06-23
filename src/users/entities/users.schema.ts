import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Entity } from "typeorm";

@Schema({
    timestamps: true
})
@Entity()
export class Users {
    @Prop()
    username : string;

    @Prop()
    email : string;

    @Prop()
    password : string;
}

export const UsersSchemma = SchemaFactory.createForClass(Users)