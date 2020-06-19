import * as parser from 'body-parser';
import * as compression from "compression";
import * as cors from 'cors';
import { Router } from 'express';
import helmet = require('helmet');
const morgan = require("morgan");
import { LoggerStream } from '../utils/logger';

export const handleHelmet = (router: Router) =>
    router.use(helmet());

export const handleCors = (router: Router) =>
    router.use(cors({ credentials: true, origin: true }));

export const handleBodyRequestParsing = (router: Router) => {
    router.use(parser.urlencoded({ extended: true }));
    router.use(parser.json());
};

export const handleCompression = (router: Router) => {
    router.use(compression());
};

export const handleMorgan = (router: Router) =>{
    const format = ':remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms';
    router.use(morgan(format, { stream: new LoggerStream() }));
};