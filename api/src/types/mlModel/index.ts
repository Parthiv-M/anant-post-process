interface FeatureType {
    featureName: string,
    featureValue: Number,
}

interface ModelOutputType {
    modelOutput?: String, 
    success: Boolean,
    error?: any,
}

export type { FeatureType, ModelOutputType };