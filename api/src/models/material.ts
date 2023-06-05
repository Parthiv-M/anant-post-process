import { prop } from "@typegoose/typegoose";

export default class Material {
    @prop({ type: String, required: true, unique: true })
    public materialName: string;

    @prop({ type: Number })
    public numberOfModels: string;

    @prop({ type: String, required: true })
    public description: string;
}
