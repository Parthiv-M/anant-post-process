import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";

const ModelCard = (props: { modelData: any, modelSelected: string, setMaterialSelected: Dispatch<SetStateAction<string>> }) => {
    const router = useRouter();
    const handleClick = (name: string, materialId: string, modelId: string) => {
        props?.setMaterialSelected(name);
        router.push({
            pathname: `/postprocess/models/${materialId}/${modelId}`
        });
    }
    return (
        <div
            className={`
                py-3 card-image rounded-lg bg-blue-300/20 hover:bg-blue-300/30 hover:cursor-pointer 
                border hover:border-slate-200 border-transparent
            `}
            onClick={
                () => handleClick(
                        props?.modelData?.modelName, 
                        props?.modelData?.material?._id, 
                        props?.modelData?._id
                    )
            }
        >
            <div className='h-full flex flex-col justify-between px-2'>
                <h5 className='font-bold'>{props?.modelData?.modelName.toUpperCase()}</h5>
                <p className='text-sm mt-6'>{props?.modelData?.modelDescription.slice(0, 150)}{"..."}</p>
            </div>
        </div>
    )
}

export default ModelCard; 