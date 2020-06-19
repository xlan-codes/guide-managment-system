import { NextFunction, Response  } from "express";
import { createHttpError, HTTPClientError } from "./httpErrors";
import { logger } from "./logger";

export const notFoundError = () => {
    throw createHttpError(404, "Method not found.");
};

export const clientError = (err: Error, res: Response, next: NextFunction) => {
    if (err instanceof HTTPClientError) {
        logger.error(err.stack);
        res.status(err.statusCode).json({error:err.message});
    } else {
        next(err);
    }
};

export const serverError = (err: Error, res: Response, next: NextFunction) => {
    logger.error(err.stack);
    if (process.env.NODE_ENV === "production") {
        res.status(500).send("Internal Server Error");
    } else {
        res.status(500).json({error:err.stack});
    }
};