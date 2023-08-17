import AppError from "../utils/appError.js";
import dotenv from "dotenv";
dotenv.config();

const handleDuplicateFieldsDB = (err) => {
    console.log("Hello this is middleware handle dubplicate field");
    const value = err?.keyValue?.username
        ? err?.keyValue?.username
        : err?.keyValue?.email;
    const message = `Duplicate field value: ${value}. Please use another value`;

    return new AppError(message, 400);
};

const sendErrorDev = (err, req, res) => {
    //A) API
    if (req.originalUrl.startsWith("/api")) {
        console.log("Hello this is middleware handle Error dev");
        return res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack,
        });
    }
};

const sendErrorProd = (err, req, res) => {
    // API
    //Operational, trusted error: send message to client
    if (req.originalUrl.startsWith("/api")) {
        console.log("Hello this is middleware handle Error production");
        console.log(err.isOperational);
        if (err.isOperational) {
            return res.status(err.statusCode).json({
                // error: err,
                status: err.status,
                message: err.message,
            });
        }
        //Programing or other unknown error: don't leak error details
        return res.status(500).json({
            // error: err,
            status: "error",
            message: "Something went very wrong!",
        });
    }
};

const handleError = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    if (process.env.NODE_ENV === "development") {
        console.log("2");
        sendErrorDev(err, req, res);
    } else if (process.env.NODE_ENV === "production") {
        console.log("Hello this middleware enviroment production");
        console.log("Error enviroment production:::::", err);
        if (err.codeName === "DuplicateKey" || err.code === 11000)
            err = handleDuplicateFieldsDB(err);
        console.log("Send error product::::::::::");
        sendErrorProd(err, req, res);
    }
};

export default handleError;
