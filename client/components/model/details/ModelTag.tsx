const ModelTag = (props: any) => {
    return (
        <div className="bg-blue-200 flex items-center justify-center gap-1 py-1 px-2 rounded-md">
            {props?.isImageTag && <i className="text-gray-800 fa-solid fa-image"></i>}
            <p className="text-gray-800 text-sm font-bold">{props?.name}</p>
        </div>
    )
}

export default ModelTag;