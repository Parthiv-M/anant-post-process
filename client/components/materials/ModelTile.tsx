const ModelTile = (props: any) => {
    return (
        <div className={`
                rounded-lg hover:bg-black/30 hover:cursor-pointer border mt-2
                ${props?.model?._id === props?.selectedModel ? "border-black/40 bg-black/30" : "border-transparent bg-black/20"}
            `}
            onClick={() => props?.setSelectedModel(props?.model?._id)}
        >
            <div className='h-full flex flex-col justify-between p-2'>
                <h5 className='font-bold'>{props?.model?.modelName}</h5>
                <p className='text-sm mt-4'>{props?.model?.modelDescription}{"..."}</p>
            </div>
        </div>
    )
}

const ModelList = (props: any) => {
    return (
        <div className="max-h-98 overflow-y-scroll">
            {
                props?.data.length !== 0 && props?.data?.map((model: any, index: number) => {
                    return (
                        <ModelTile
                            key={index} 
                            model={model}
                            selectedModel={props?.selectedModel}
                            setSelectedModel={props?.setSelectedModel}
                        />
                    )
                })
            }
        </div>
    )
}

export default ModelList;