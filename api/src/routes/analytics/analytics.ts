import MLModelClass from "@models/model";
import { ErrorResponse, SuccessResponse } from "@typeFiles/api";
import { getModelForClass } from "@typegoose/typegoose";
import { Router, Request, Response } from "express";
import parseCSV from "functions/parseCSV";

// create router
const analyticsRouter = Router();
// create database model from class
const MLModel = getModelForClass(MLModelClass);

analyticsRouter.get(
    "/getcolumndata/:modelId/:columnName",
    async (req: Request, res: Response) => {
        if (!req.params.modelId) {
            const response: ErrorResponse = {
                error: true,
                message: "Model ID cannot be empty"
            }
            return res.status(400).send(response);
        }
        if (!req.params.columnName) {
            const response: ErrorResponse = {
                error: true,
                message: "Column name cannot be empty"
            }
            return res.status(400).send(response);
        }
        try {
            const model = await MLModel.findOne({ _id: req.params.modelId });
            const columnData = await parseCSV(model?.trainDataPath, req.params.columnName);
            if (columnData !== null) {
                const response: SuccessResponse = {
                    error: false,
                    data: columnData,
                    message: "Column data retrieved"
                }
                return res.status(200).send(response);
            } else {
                const response: ErrorResponse = {
                    error: true,
                    message: "No such column in dataset"
                }
                return res.status(401).send(response);
            }
        } catch (error) {
            const response: ErrorResponse = {
                error: true,
                message: "Error getting data",
                data: error
            }
            return res.status(400).send(response);
        }
    });

export default analyticsRouter;