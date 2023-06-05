import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";

const MaterialCard = (props: { materialData: any, materialSelected: string, setMaterialSelected: Dispatch<SetStateAction<string>> }) => {
    const router = useRouter();
    const handleClick = (name: string, id: string) => {
        props?.setMaterialSelected(name);
        router.push({
            pathname: `/models/${id}`
        });
    }
    return (
        <div
            className={`
                rounded-xl bg-white/20 hover:cursor-pointer hover:bg-white/30 
                border hover:border-slate-200 border-transparent
            `}
            onClick={() => handleClick(props?.materialData?.materialName, props?.materialData?._id)}
        >
            <div className='h-full flex flex-col justify-between px-2 py-3 rounded-lg'>
                <h5 className='font-bold'>{props?.materialData?.materialName.toUpperCase()}</h5>
                <p className='text-sm mt-6'>A little bit about alloys here little bit about alloys here little bit about alloys here</p>
            </div>
        </div>
    )
}

export default MaterialCard; 