import { prop, PropType, mongoose, DocumentType } from "@typegoose/typegoose";

class Feature {
    @prop({ type: String, required: true })
    public featureName: string;

    @prop({ type: String, required: true })
    public fieldName: string;

    @prop({ type: Boolean, required: true })
    public requiredForModel: Boolean;

    @prop({ type: Boolean, required: true })
    public isImageFeature: Boolean;
}

class ModelReference {
    @prop({ type: String, required: true })
    public referenceDetails!: string;

    @prop({ type: String, required: true })
    public refLink!: string;
}

export default class MLModel {
    @prop({ type: String, required: true })
    public modelName!: string;

    @prop({ type: String, required: true })
    public createdBy!: string;

    @prop({ type: String, required: true })
    public modelDescription!: string;

    @prop({ type: mongoose.Types.ObjectId, ref: "Material" })
    public material!: mongoose.Types.ObjectId;

    @prop({ type: Boolean, required: true })
    public acceptsImage!: Boolean;

    @prop({ type: () => ModelReference, required: true }, PropType.ARRAY)
    public references: mongoose.Types.DocumentArray<DocumentType<ModelReference>>;

    @prop({ type: Number, required: true })
    public numFeatures: Number;

    @prop({ type: Feature, required: true }, PropType.ARRAY)
    public features: mongoose.Types.DocumentArray<DocumentType<Feature>>;

    @prop({ type: String, required: true })
    public scalerFilePath!: string;

    @prop({ type: String, required: true })
    public modelFilePath!: string;

    @prop({ type: String, required: true })
    public trainDataPath!: string;

    @prop({ type: String, required: true })
    public outputFormatting: string;
}
