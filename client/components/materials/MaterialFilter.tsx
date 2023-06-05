import { useRouter } from "next/router";
import { useEffect } from "react";

const FilterPill = (props: any) => {
    const router = useRouter();
    return (
        <div 
            className={`
                px-3 py-1 text-white bg-white/30 rounded-lg hover:cursor-pointer hover:bg-white/20 border
                ${props?.material._id === props?.selectedFilter ? "border-neutral-200" : "border-transparent"}
            `}
            onClick={() => {
                    props.setSelectedModel("");
                    props.setSelectedFilter(props?.material?._id);
                    router.push({
                        pathname: `/materials`,
                        query: {
                            material: props?.material?._id
                        }
                    });
                }
            }
        >
            {props?.material?.materialName}
        </div>
    )
}

const MaterialFilter = (props: any) => {
    const router = useRouter();
    useEffect(() => {
        props?.setSelectedFilter(router.query.material ? router.query.material.toString() : "")
    }, [router.query])
    return (
        <div className="mt-16">
            <h6>Material Filter</h6>
            <div className="flex flex-wrap mt-2 gap-2">
                {
                    props?.data.map((pill: any, index: number) => {
                        return (
                            <FilterPill 
                                key={index}
                                selectedFilter={props?.selectedFilter} 
                                setSelectedFilter={props?.setSelectedFilter}
                                setSelectedModel={props?.setSelectedModel} 
                                material={pill}
                            />
                        )
                    })
                }
            </div>
        </div>
    );
}

export default MaterialFilter   