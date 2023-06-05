import { useState } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";

import GoBack from "components/common/GoBack";
import MaterialFilter from "components/materials/MaterialFilter";
import ModelList from "components/materials/ModelTile";
import ModelPreivew from "components/materials/ModelPreview";

const MaterialsPage = (props: any) => {
    const router = useRouter();
    const [selectedFilter, setSelectedFilter] = useState<string>(router.query.material ? router.query.material.toString() : "");
    const [selectedModel, setSelectedModel] = useState<string>("");
    return (
        <div className="max-w-screen min-h-screen inter">
            <div className="py-8 md:w-3/4 w-full md:px-0 px-4 mx-auto">
                <GoBack />
                <MaterialFilter
                    selectedFilter={selectedFilter}
                    setSelectedFilter={setSelectedFilter}
                    setSelectedModel={setSelectedModel}
                    data={props?.materialsData}
                />
                <div className="mt-3 grid md:grid-cols-3 grid-cols-1 md:gap-3 gap-y-3">
                    {
                        (selectedFilter === "") ||
                            (selectedFilter !== "" && selectedModel === "" && props?.modelsData?.length === 0)
                            ?
                            <div className="bg-blue-100/10 w-full h-48 flex items-center justify-center 
                                            rounded-xl text-white/40 uppercase text-sm text-center">
                                {
                                    selectedFilter !== "" && props?.modelsData && props?.modelsData.length === 0
                                        ? <p>No models found</p>
                                        : <p>Select a material <br /> to view models</p>
                                }
                            </div>
                            : <ModelList
                                data={props?.modelsData}
                                selectedModel={selectedModel}
                                setSelectedModel={setSelectedModel}
                            />
                    }
                    <div className="rounded-lg col-span-2">
                        {
                            ((selectedFilter === "" && selectedModel === "") || (selectedModel === ""))
                                ?
                                <div className="bg-blue-100/10 w-full h-48 flex items-center justify-center rounded-xl text-white/40 uppercase text-sm text-center">
                                    Select a model <br />to view details
                                </div>
                                : <ModelPreivew
                                    material={selectedFilter}
                                    model={selectedModel}
                                    modelData={props?.modelsData.filter((model: any) => model._id === selectedModel)[0]}
                                />
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    const SERVER_URL = process.env.NODE_ENV === "development" ? process.env.DEV_SERVER_URL : process.env.PROD_SERVER_URL ;

    const materialsResponse = await fetch(`${SERVER_URL}/api/materials/`);
    const materialsData = await materialsResponse.json();
    let modelsData = null;
    if (context.query.material) {
        try {
            const modelsResponse = await fetch(`${SERVER_URL}/api/ml/getModelsByMaterial?materialID=${context?.query?.material}`);
            modelsData = await modelsResponse.json();
        } catch (error) {
            console.log(error);
        }
    }
    return {
        props: {
            materialsData: !materialsData.error ? materialsData.data : "Error",
            modelsData: modelsData !== null ? modelsData.data : [],
        }
    }
}

export default MaterialsPage;