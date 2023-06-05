import Graph from "components/visualise/Graph";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";

const VisualiseData = (props: any) => {

    const SERVER_URL = process.env.NODE_ENV === "development" ? process.env.DEV_SERVER_URL : process.env.PROD_SERVER_URL ;

    const [columnData, setColumnData] = useState(null);
    const [selectedColumn, setSelectedColumn] = useState("");
    const [loading, setLoading] = useState(false);

    const getColumnData = async (featureName: string) => {
        try {
            const columnRes = await fetch(`${SERVER_URL}/api/analytics/getcolumndata/63fdc7e7ae2b5c97179d08f1/${featureName}`);
            const columnDataFromDataset = await columnRes.json();
            setColumnData(columnDataFromDataset?.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const handleColumnChange = async (featureName: string) => {
        if (selectedColumn === featureName) {
            return;
        }
        setSelectedColumn(featureName);
        setLoading(true);
        setColumnData(null);
        await getColumnData(featureName);
    }

    return (
        <div className="min-h-screen inter">
            <div className="py-8 w-3/4 mx-auto">
                <div className="mt-3 grid grid-cols-3 gap-3">
                    <div className="p-2">
                        <h5 className="text-lg mb-2">Columns in dataset</h5>
                        <div className="flex flex-wrap gap-2">
                            {
                                props?.modelData?.features
                                && props?.modelData?.features?.map((feature: any) => {
                                    return (
                                        <p
                                            className={`text-black text-xl px-3 py-1 rounded-lg hover:cursor-pointer border
                                                    ${selectedColumn === feature?.featureName ? "bg-white/30 font-bold text-white" : "bg-white/70 border-transparent"}`}
                                            onClick={() => handleColumnChange(feature?.featureName)}
                                        >
                                            {feature?.featureName}
                                        </p>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="col-span-2 p-2">
                        {
                            selectedColumn === "" &&
                            <div className="flex justify-center items-center bg-black/20 text-white/80 h-96 w-full rounded-lg">
                                Select column to view graph
                            </div>
                        }
                        {
                            loading && 
                            <div className="flex justify-center items-center bg-black/20 text-white/80 h-96 w-full rounded-lg">
                                Loading graph...
                            </div>
                        }
                        {
                            selectedColumn !== "" && !loading && columnData &&
                            <Graph data={columnData} selectedColumn={selectedColumn} />
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const modelResp = await fetch(`http://localhost:3002/api/ml/getModelById/${context.query.path![0]}`);
    const modelData = await modelResp.json();
    return {
        props: {
            modelData: modelData.data ? modelData.data : "Error"
        }
    }
}

export default VisualiseData;