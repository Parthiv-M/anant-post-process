import { GetStaticPaths, GetStaticProps } from "next";
import { useState } from "react";

import ModelDetails from "components/model/details/ModelDetails";
import GoBack from "components/common/GoBack";
import ModelForm from "components/model/form/ModelForm";
import OutputArea from "components/model/output/OutputArea";

const ModelSelected = (props: any) => {
    const [modelOutput, setModelOutput] = useState<number>(0);
    return (
        <div className="min-h-screen w-screen">
            <div className="container md:px-28 px-4 mt-16">
                <GoBack />
            </div>
            <div className="w-full md:p-16 grid md:grid-cols-12 grid-cols-1">
                <div className="flex flex-col items-center col-span-5 overflow-x-hidden overflow-y-scroll md:p-16 p-6">
                    <ModelDetails
                        modelName={props?.modelData?.modelName}
                        modelDescription={props?.modelData?.modelDescription}
                        createdBy={props?.modelData?.createdBy}
                        numFeatures={props?.modelData?.numFeatures}
                    />
                    {/* <References references={props?.modelData?.references} /> */}
                </div>
                <div className="col-span-7 overflow-x-hidden overflow-y-scroll">
                    <ModelForm formFields={props?.modelData?.features} setModelOutput={setModelOutput} />
                    <OutputArea modelOutput={modelOutput} />
                </div>
            </div>
        </div>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const SERVER_URL = process.env.NODE_ENV === "development" ? process.env.DEV_SERVER_URL : process.env.PROD_SERVER_URL;
    const materialsResponse = await fetch(`${SERVER_URL}/api/materials/`);
    const materialsData = await materialsResponse.json();
    let paths: any = [];
    for (let material of materialsData?.data) {
        const modelsResponse = await fetch(`${SERVER_URL}/api/ml/getModelsByMaterial?materialID=${material?._id}`);
        const modelsData = await modelsResponse.json();
        if (!modelsData.error)
            modelsData?.data.forEach((model: any) => {
                paths.push({ params: { material: material._id, slug: model?._id } });
            });
    }
    return {
        paths: paths,
        fallback: false,
    }
}

export const getStaticProps: GetStaticProps = async (context) => {
    const modelsResponse = await fetch(`http://localhost:3002/api/ml/getModelByID/${context?.params?.slug}`);
    const modelsData = await modelsResponse.json();
    return {
        props: { modelData: !modelsData?.error ? modelsData?.data : "Error" },
    }
}

export default ModelSelected;