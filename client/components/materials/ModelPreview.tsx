const ModelPreivew = (props: any) => {
    return (
        <div className="p-2">
            <h3 className="text-xl font-bold">{props?.modelData?.modelName}</h3>
            <h6 className="text-md">{props?.modelData?.createdBy}</h6>
            <p className="text-sm">{props?.modelData?.modelDescription}</p>
            <div className="flex flex-col gap-2 mt-2">
                <a 
                    href={`/models/${props?.modelData?.material?._id}/${props?.modelData?._id}`}
                    className="text-center bg-blue-200 py-2 rounded-lg text-black font-bold"
                >
                    Try the model <i className="fa-solid fa-arrow-right"></i>
                </a>
                <a
                    href={`/visualise/${props?.modelData?._id}`}
                    className="text-center bg-white/10 py-2 rounded-lg"
                >
                    Visualise dataset <i className="fa-solid fa-arrow-right"></i>
                </a>
            </div>
        </div>
    );
}

export default ModelPreivew;