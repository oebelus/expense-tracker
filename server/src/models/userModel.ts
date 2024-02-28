import { modelOptions, prop, getModelForClass, Ref } from "@typegoose/typegoose";
import { Transaction } from "./transactionModel";

@modelOptions({ schemaOptions: {timestamps: true} })

export class User {
    public _id?: string

    @prop({ required: true})
    public firstName!: string

    @prop({ required: true})
    public familyName!: string

    @prop({ required: true, unique: true})
    public email!: string

    @prop()
    public image?: string

    @prop({ required: true})
    public password!: string

    @prop({ ref: () => Transaction })
    public transactions?: Ref<Transaction>[]
}

export const UserModel = getModelForClass(User)