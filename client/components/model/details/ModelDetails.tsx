import ModelThumb from "../ModelThumb";
import ModelTag from "./ModelTag";

const ModelDetails = (props: any) => {
    return (
        <div className="container mx-auto">
            <ModelThumb name={props?.modelName} />
            <h2 className="mt-1 text-2xl font-bold">{props?.modelName}</h2>
            <h5 className="text-lg text-gray-400 font-bold">{props?.createdBy}</h5>
            <p className="text-sm text-gray-200">{props?.modelDescription}</p>
            <div className="flex flex-wrap mt-3">
                <ModelTag isImageTag={false} name={props?.numFeatures + " features"} />
            </div>
        </div>
    )
}

export default ModelDetails;