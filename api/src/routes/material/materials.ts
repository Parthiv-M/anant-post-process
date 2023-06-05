import { ErrorResponse, SuccessResponse } from "@typeFiles/api";
import { getModelForClass } from "@typegoose/typegoose";
import { Router, Request, Response } from "express";
import { validationResult } from "express-validator";
import { body } from "express-validator/src/middlewares/validation-chain-builders";
import MaterialClass from "models/material";

// create router
const materialsRouter = Router();
// create database model from class
const MaterialsModel = getModelForClass(MaterialClass);

/* 
    @ROUTE          GET /
    @DESCRIPTION    route to get all materials in the database
    @ACCESS         public 
*/
materialsRouter.get("/", async (_, res: Response) => {
    try {
        const allMaterials = await MaterialsModel.find({});
        if (allMaterials.length === 0) {
            const response: SuccessResponse = {
                error: false,
                message: "No materials found",
                data: []
            };
            return res.status(200).send(response);
        }
        const response: SuccessResponse = {
            error: false,
            message: "Materials found",
            data: allMaterials
        };
        return res.status(200).send(response)
    } catch (error) {
        const response: ErrorResponse = {
            error: true,
            message: "Could not GET materials",
            data: error
        }
        return res.status(500).send(response);
    }
});

/* 
    @ROUTE          POST /add/material
    @DESCRIPTION    route to add a material to the database
    @ACCESS         public 
*/
materialsRouter.post(
    "/add/material",
    body("numberOfModels").isNumeric(),
    async (req: Request, res: Response) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const newMaterial = new MaterialsModel(req.body);
        await newMaterial.save();
        const response: SuccessResponse = {
            error: false,
            message: `Material ${newMaterial.materialName} created successfully`
        }
        return res.status(200).send(response);
    } catch (error) {
        const response: ErrorResponse = {
            error: true,
            message: "Could not add material",
            data: error
        }
        return res.status(500).send(response);
    }
});

export default materialsRouter;
