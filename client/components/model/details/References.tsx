import { useState } from "react";

const References = (props: any) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="w-full mt-5">
            <div
                className={`
                    bg-white/10 flex justify-between items-center py-2 px-3 
                    ${isOpen ? "rounded-tr-lg rounded-tl-lg" : "rounded-lg"}
                `}
            >
                <h4 className="text-lg font-bold">References</h4>
                <i
                    className={`fa-solid fa-chevron-${isOpen ? "up" : "down"} hover:cursor-pointer`}
                    onClick={() => setIsOpen(!isOpen)}
                ></i>
            </div>
            <div className={`${isOpen ? "visible" : "hidden"} bg-white/5 p-2 rounded-br-lg rounded-bl-lg`}>
                {
                    props?.references?.map((reference: any, index: number) => {
                        return (
                            <p className="text-sm">
                                [{index + 1}] {reference?.referenceDetails}
                                <span>
                                    <a href={reference.referenceLink} rel="noreferrer" className="text-sm text-blue-300 hover:text-blue-400 ml-1">
                                        Read More {">"}</a>
                                </span>
                            </p>
                        )
                    })
                }
                {
                    !props?.references && <p className="text-sm">No references listed yet</p>
                }
            </div>
        </div>
    );
}

export default References;