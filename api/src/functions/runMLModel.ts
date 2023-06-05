import { spawnSync } from "child_process";

const runMLModel = (pathOfModel: string, pathOfScaler: string, inputs: any[], featuresModelArray: Number[]) => {
    try {
        const pythonChild = spawnSync(
            "python",
            [
                "src/functions/scripts/runModel.py",
                JSON.stringify(inputs),
                pathOfModel,
                pathOfScaler,
                JSON.stringify(featuresModelArray),
            ],
            { encoding : 'utf8' }
        );
        const modelOutput = pythonChild.stdout.toString();
        if (pythonChild.status !== 0) {
            throw new Error(modelOutput)
        }
        return {
            success: true,
            modelOutput: JSON.parse(modelOutput)
        }
    } catch (error: any) {
        return {
            success: false,
            error: error.message
        }
    }
}

export default runMLModel;
