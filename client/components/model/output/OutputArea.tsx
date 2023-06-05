const OutputArea = (props: any) => {
    return (
        <div className="md:p-8 p-4 md:mt-auto mt-4">
            <div className="bg-black/50 px-3 pt-6 pb-4 rounded-lg relative">
                <h5 className="absolute -top-3 text-md font-bold text-neutral-800 bg-blue-200 px-2 py-1 rounded-lg">Model Output</h5>
                {
                    props?.modelOutput !== 0 &&
                    <>
                        <p className="text-neutral-300 text-md border-l border-neutral-400 pl-3">This is a measure of yield strength as predicted by the model</p>
                        <p className="text-xl">{Math.log(parseFloat(props?.modelOutput))}</p>
                    </>
                }
                {
                    props?.modelOutput === 0 &&
                    <p className="text-neutral-300 text-md border-l border-neutral-400 pl-3">Enter values and run model to see the output</p>
                }
            </div>
        </div>
    )
}

export default OutputArea;