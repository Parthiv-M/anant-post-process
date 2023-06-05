import { ErrorResponse, SuccessResponse } from "@typeFiles/api";
import { getModelForClass } from "@typegoose/typegoose";
import { Router, Request, Response } from "express";
import MLModelClass from "@models/model";
import { ModelOutputType } from "@typeFiles/mlModel";
import runMLModel from "functions/runMLModel";
import { body, validationResult } from "express-validator";

// load environment variables
require("dotenv").config();

// create router
const mlModelRouter = Router();
// create database model from class
const MLModel = getModelForClass(MLModelClass);

/* 
    @ROUTE          GET /getModelsByMaterial
    @QUERY          materialID
    @DESCRIPTION    route to get ML models of a particular material
    @ACCESS         public 
*/
mlModelRouter.get("/getModelsByMaterial", async (req: Request, res: Response) => {
    const query = req.query;
    try {
        let modelsByMaterial = await MLModel.find({ material: query.materialID }).populate("material");
        if (modelsByMaterial.length === 0) {
            const response: ErrorResponse = {
                error: true,
                message: "No such ML models found",
                data: modelsByMaterial
            }
            return res.status(400).send(response);
        }
        const response: SuccessResponse = {
            error: false,
            message: `ML models for ${req.params.materialID} found`,
            data: modelsByMaterial
        }
        return res.status(200).send(response);
    } catch (error) {
        const response: ErrorResponse = {
            error: true,
            message: "Error finding models",
            data: error
        }
        return res.status(500).send(response);
    }
});

/* 
    @ROUTE          GET /getModelByID
    @PARAMS         modelID
    @DESCRIPTION    route to get details about a model by modelID
    @ACCESS         public 
*/
mlModelRouter.get("/getModelByID/:modelID", async (req: Request, res: Response) => {
    try {
        const modelByID = await MLModel.findOne({ _id: req.params.modelID }).populate("material");
        if (!modelByID) {
            const response: SuccessResponse = {
                error: true,
                message: "ML Model does not exist"
            }
            return res.status(400).send(response);
        }
        const response: SuccessResponse = {
            error: false,
            message: `ML model with _id ${req.params.modelID} found`,
            data: modelByID
        }
        return res.status(200).send(response);
    } catch (error) {
        const response: ErrorResponse = {
            error: true,
            message: "Error finding model",
            data: error
        }
        return res.status(500).send(response);
    }
});

/* 
    @ROUTE          POST /add/model
    @DESCRIPTION    route to add a new ML model to the database
    @ACCESS         public 
*/
mlModelRouter.post(
    "/add/model",
    body("numFeatures").isNumeric(),
    body("acceptsImage").isBoolean(),
    async (req: Request, res: Response) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const {
                modelName,
                createdBy,
                modelDescription,
                material,
                acceptsImage,
                references,
                numFeatures,
                features,
                modelFilePath,
                trainDataPath,
                scalerFilePath
            } = req.body;
            const model = new MLModel({
                modelName,
                createdBy,
                modelDescription,
                material,
                acceptsImage,
                references,
                numFeatures,
                features,
                modelFilePath,
                trainDataPath,
                scalerFilePath
            });
            await model.save();

            const response: SuccessResponse = {
                error: false,
                message: `Added ${model.modelName} model to database`
            }

            return res.status(200).send(response);
        } catch (error) {
            const response: ErrorResponse = {
                error: true,
                message: "Error adding model to database",
                data: error
            }
            return res.status(500).send(response);
        }
    });

/* 
    @ROUTE          POST /run/model
    @PARAMS         modelID
    @DESCRIPTION    route to execute a particular model by modelID
    @ACCESS         public 
*/
mlModelRouter.post("/run/model/:modelID", async (req: Request, res: Response) => {
    // const userInputs = req.body;
    console.log("i: ", req.body);
    // perform validation on req.body
    try {
        const modelToRun = await MLModel.findOne({ _id: req.params.modelID });
        const featuresModelArray: any[] = modelToRun.features;
        const pathToModel = process.env.ML_MODEL_DIR_PATH + "/" + modelToRun.modelFilePath;
        const pathToScaler = process.env.SCALER_DIR_PATH + "/" + modelToRun.scalerFilePath;
        const outputFromModelExec: ModelOutputType = await runMLModel(pathToModel.trim(), pathToScaler.trim(), req.body, featuresModelArray);
        if (outputFromModelExec.success === false) {
            const response: ErrorResponse = {
                error: true,
                message: outputFromModelExec.error ? outputFromModelExec.error : "Model could not execute successfully",

            }
            return res.status(400).send(response);
        }
        const response: SuccessResponse = {
            error: false,
            message: "Model executed successfully",
            data: outputFromModelExec.modelOutput
        }
        return res.status(200).send(response);
    } catch (error) {
        const response: ErrorResponse = {
            error: true,
            message: "Error running model",
            data: error
        }
        return res.status(500).send(response);
    }
});

export default mlModelRouter;
