// importing packages
import cors from "cors";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import express, {
    Application,
    Response
} from "express";
import logger from "@logger/logger";
import pino from "pino-http";

// import helper functions
import connectToDB from "functions/connectDb";

// import types
import { ErrorResponse, SuccessResponse } from "@typeFiles/index";

// connecting to database
connectToDB();

// importing routes
import materialsRouter from "@routes/material/materials";
import mlModelRouter from "@routes/mlModel/mlModel";
import analyticsRouter from "@routes/analytics/analytics";

// initialise express server
const server: Application = express();

// use logger
server.use(pino({
    logger,
}));

// defining cors
server.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    preflightContinue: false,
    optionsSuccessStatus: 200
}));

// use express middleware
server.use(mongoSanitize());
server.use(express.json({ limit: "10kb", strict: true, type: "application/json" }));
server.use(helmet());

// setup static directories
const mlModelDirPath: string = "C:/Users/parth/Desktop/theProton/projects.mine/iisc/ml_models";
const trainDataDirPath: string = "C:/Users/parth/Desktop/theProton/projects.mine/iisc/train_data";
const staticOptions: any = {
    dotfiles: 'deny',
    etag: true,
    immutable: true,
    maxAge: '1d',
}
server.use('/static/ml_models', express.static(mlModelDirPath, staticOptions));
server.use('/static/train_data', express.static(trainDataDirPath, staticOptions));

// setup server routing

// middleware to run ML model

// routes related to materials
server.use("/api/materials", materialsRouter);

// routes related to ML models
server.use("/api/ml", mlModelRouter);

// routes related to analytics
server.use("/api/analytics", analyticsRouter);

// route to return analytics data from train data

/* 
    @ROUTE          GET /api/status
    @DESCRIPTION    route to check API status
    @ACCESS         public
*/
server.get("/api/status", (_, res: Response) => {
    const response: SuccessResponse = {
        message: "API is functional",
        error: false
    }
    res.status(200).send(response);
});

/*
    @route         ALL *
    @description   fallback route
    @access        public
*/
server.all("*", (_, res: Response) => {
    console.log("Fallback route called");
    const response: ErrorResponse = {
        message: "Route does not exist, try again",
        error: true
    }
    res.status(400).send(response);
});


// get the express server running
const port: number = parseInt(process.env.PORT) || 3002;
server.listen(port, () => {

});

