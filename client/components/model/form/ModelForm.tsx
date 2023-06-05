import { useEffect, useState } from "react";

const FrontFaceForm = (props: any) => {
    return (
        <>
            {props?.fieldData.map((field: any, index: number) => {
                return (
                    <div key={index} className="flex flex-col">
                        <label className="text-sm">{field.fieldName}</label>
                        <input
                            type="number"
                            autoComplete="off"
                            name={field.featureName}
                            value={props?.formData[field.featureName]}
                            placeholder={`Enter value for ${field.featureName}`}
                            className="p-2 rounded-md border border-transparent focus:border-white outline-none bg-white/30 text-neutral-200"
                            onChange={(e) => { props?.setFormData({ ...props?.formData, [e.target.name]: parseFloat(e.target.value) }) }}
                        />
                    </div>
                )
            })}
        </>
    )
}

const BackFaceForm = (props: any) => {
    return (
        <>
            {props?.fieldData.map((field: any, index: number) => {
                return (
                    <div key={index} className="flex flex-col">
                        <label className="text-sm">{field.fieldName}</label>
                        <input
                            type="number"
                            autoComplete="off"
                            name={field.featureName}
                            value={props?.formData[field.featureName]}
                            placeholder={`Enter value for ${field.featureName}`}
                            className="p-2 rounded-md border border-transparent focus:border-white outline-none bg-white/30 text-neutral-200"
                            onChange={(e) => { props?.setFormData({ ...props?.formData, [e.target.name]: parseFloat(e.target.value) }) }}
                        />
                    </div>
                )
            })}
        </>
    )
}

const ModelForm = (props: any) => {

    const [formData, setFormData] = useState<any>({});
    const [formFace, setFormFace] = useState("front");

    const validateFields = () => {
        let featureArr: any = []
        props?.formFields?.map((field: any) => {
            featureArr.push(field.featureName);
        });
        if(JSON.stringify(featureArr.sort()) === JSON.stringify(Object.keys(formData).sort())) {
            return true
        } else {
            
        }
    }

    const initState = () => {
        let featureArr: any = [];
        let stateObj: any = {};
        props?.formFields?.map((field: any) => {
            featureArr.push(field.featureName);
        });
        featureArr.forEach((featureName: string) => {
            stateObj[featureName] = null;
        });
        setFormData(stateObj);
    }

    useEffect(() => {
        initState();
    }, [])

    const runModel = async () => {
        validateFields();
        try {
            const res = await fetch(
                `http://localhost:3002/api/ml/run/model/${window.location.pathname.split("/")[3]}`,
                {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    },
                    body: JSON.stringify(formData)
                },
            );
            const resData = await res.json();
            console.log(resData);
            if (resData.error) {
                // set error from resData.message
                return;
            }
            props?.setModelOutput(resData.data[0]);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="md:px-8 px-4 md:py-6 py-2">
            <div className="grid grid-cols-2 gap-y-1 gap-x-2">
                {
                    formFace.toLowerCase() === "front"
                        ? <FrontFaceForm fieldData={props?.formFields?.slice(0, 14)} formData={formData} setFormData={setFormData} />
                        : <BackFaceForm fieldData={props?.formFields?.slice(14)} formData={formData} setFormData={setFormData} />
                }
            </div>
            {
                formFace.toLowerCase() === "front"
                    ? <button
                        onClick={() => setFormFace("back")}
                        className="w-full bg-black/70 mt-3 py-2 rounded-lg">
                        Continue <i className="fa-solid fa-arrow-right"></i>
                    </button>
                    : <div className="flex items-center gap-2 mt-3">
                        <button className="w-1/3 bg-blue-300/70 py-2 rounded-lg" onClick={() => setFormFace("front")}>
                            <i className="fa-solid fa-arrow-left"></i> Go Back
                        </button>
                        <button className="flex-grow bg-black/70 py-2 rounded-lg" onClick={runModel}>
                            Run Model <i className="fa-solid fa-arrow-right"></i>
                        </button>
                    </div>
            }
        </div>
    );
}

export default ModelForm;