import { GetStaticPaths, GetStaticProps } from "next"
import { useState } from "react";

import GoBack from "components/common/GoBack"
import ModelCard from "components/model/ModelCard";

const ModelsByMaterial = (props: any) => {
    const [modelSelected, setModelSelected] = useState<string>("");
    return (
        <div className='max-w-screen min-h-screen flex flex-col justify-center inter'>
            <div className='w-3/4 gap-5 px-8 mx-auto'>
                <GoBack />
                <div className='mt-16 px-3'>
                    <div className='flex items-center'>
                        <i className={`fa-${modelSelected === "" ? "regular" : "solid"} fa-circle-check text-2xl`}></i>
                        <h3 className='font-bold text-lg ml-3'>Choose your model</h3>
                    </div>
                </div>
                <div className='grid grid-cols-3 gap-2 mt-4 px-3'>
                    {
                        props?.data && props?.data.map((model: any) => {
                            return <ModelCard
                                modelData={model}
                                modelSelected={modelSelected}
                                setMaterialSelected={setModelSelected}
                            />
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const SERVER_URL = process.env.NODE_ENV === "development" ? process.env.DEV_SERVER_URL : process.env.PROD_SERVER_URL ;
    const materialsResponse = await fetch(`${SERVER_URL}/api/materials/`);
    const materialsData = await materialsResponse.json();
    let paths: any = [];
    materialsData?.data?.forEach((material: any) => {
        paths.push({ params: { material: material._id } });
    });
    return {
        paths: paths,
        fallback: false,
    }
}

export const getStaticProps: GetStaticProps = async (context) => {
    const SERVER_URL = process.env.NODE_ENV === "development" ? process.env.DEV_SERVER_URL : process.env.PROD_SERVER_URL ;
    console.log("context: ", context.params)
    const modelsResponse = await fetch(`${SERVER_URL}/api/ml/getModelsByMaterial/?materialID=${context?.params?.material}`);
    const modelsData = await modelsResponse.json();
    console.log("context data: ", modelsData)
    return {
        props: { data: !modelsData?.error ? modelsData?.data : "No data" },
    }
}

export default ModelsByMaterial;