const ModelThumb = (props: any) => {

    const extractInitials = (name: string) => {
        let splitName = name.split(" ");
        let initials = splitName[0].split("")[0] + splitName[1].split("")[0];
        return initials;
    }

    return (
        <div className="flex items-center justify-center h-16 w-16 bg-black/50 rounded-md">
            <h1 className="absolute text-4xl text-white/20">{extractInitials(props?.name)}</h1>
        </div>
    )
}

export default ModelThumb;