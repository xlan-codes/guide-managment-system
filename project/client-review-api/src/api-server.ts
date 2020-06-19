import "reflect-metadata";
import * as express from 'express';
// import * as jwt from 'express-jwt';
import * as http from 'http';
import { Server } from 'typescript-rest';
// import { Server, PassportAuthenticator } from 'typescript-rest';
import controllers from './controllers';
import middleware from "./middleware";
import errorHandlers from "./middleware/errorHandlers";
import { applyMiddleware } from './utils';
import authMiddlware from './middleware/auth.middlware';
// import { ErrorToHTTPClientError } from './utils/httpErrors';
import { createConnection } from "typeorm";
import { logger } from "./utils/logger";
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
// import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt";
import { AuthController } from "./controllers/auth.controller";
import { PortalController } from "./controllers/portal.controller";

require('dotenv').config();

export class ApiServer {
    public PORT: number = +process.env.PORT || 4000;

    private readonly app: express.Application;
    private server: http.Server = null;

    constructor() {
        this.app = express();
        this.config();      
    }

    /**
     * Start the server
     * @returns {Promise<any>}
     */
    public start(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            createConnection().then(connection => {
                logger.info("Connection to DB");
                this.server = this.app.listen(this.PORT, '0.0.0.0', (err: any) => {
                    if (err) {
                        return reject(err);
                    }
                    // TODO: replace with Morgan call
                    // tslint:disable-next-line:no-console
                    logger.info(`Listening to http://0.0.0.0:${this.PORT}`);
                    logger.info("Server connected ", {connected: connection.isConnected});
                    return resolve();
                });
            }).catch((err) => {
                logger.error("DBConnection ", err);
            });
        }).catch((err) => {
            logger.error("Starting server",err);          
        });

    }

    /**
     * Stop the server (if running).
     * @returns {Promise<boolean>}
     */
    public stop(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            if (this.server) {
                this.server.close(() => {
                    return resolve(true);
                });
            } else {
                return resolve(true);
            }
        });
    }

    /**
     * Configure the express app.
     */
    private config(): void {

        // const options:cors.CorsOptions = {
        //     allowedHeaders: "*", //["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token", "Authorization"],
        //     credentials: true,
        //     methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
        //     origin: "*",
        //     preflightContinue: false
        //   };


        // Native Express configuration
        this.app.use(cors());
        this.app.use( bodyParser.urlencoded( { extended: false } ) );
        this.app.use( bodyParser.json( { limit: '1mb' } ) );


        process.on("uncaughtException", e => {
            logger.error(e.stack);
            process.exit(1);
        });
        process.on("unhandledRejection", e => {
            logger.error(e);
            process.exit(1);
        });
        // string localization
        // i18next.default.init({
        //     lng: 'en',
        //     debug: true,
        //     resources: {
        //         en: {
        //             translation: {
        //                 "key": "hello world"
        //             }
        //         }
        //     }
        // });

        Server.buildServices(this.app, [AuthController, PortalController]);
        
        applyMiddleware(authMiddlware, this.app);


        // this.app.use(jwt({ secret: Buffer.from(process.env.JWT_SECRET, 'base64') }, )
        //     .unless({ path: [/\/api-docs/i] }), function (err:any,req:any, res:any, next:any) {
        //         // this line of code trasfors the error into an httpclient error
        //         next(new ErrorToHTTPClientError(err.status, err.message, err.stack, err.name));
        //     });

        // add the middleware for the corcs, compression and body parser
        applyMiddleware(middleware, this.app);

        // this.configureAuthenticator();
        
        // Server.useIoC();
        Server.buildServices(this.app, ...controllers);

        // TODO: enable for Swagger generation error
        // Server.loadServices(this.app, 'controllers/*', __dirname);     
        // Server.swagger(this.app, { filePath: './dist/swagger.json' });

        // add middleware for error handling
        applyMiddleware(errorHandlers, this.app);
        
    }

    // private configureAuthenticator() {
    //     	const JWT_SECRET: string = process.env.JWT_SECRET;
    //     	const jwtConfig: StrategyOptions = {
    //     		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    //     		secretOrKey: Buffer.from(JWT_SECRET, "base64"),
    //     	};
    //     	const strategy = new Strategy(jwtConfig, (payload: any, done: (err: any, user: any) => void) => {
    //     		done(null, payload);
    //     	});
    //     	const authenticator = new PassportAuthenticator(strategy, {
    //     		deserializeUser: (user: string) => JSON.parse(user),
    //     		serializeUser: (user: any) => {
    //     			return JSON.stringify(user);
    //     		},
    //     	});
    //     	Server.registerAuthenticator(authenticator);
    //     	// Server.registerAuthenticator(authenticator, "secondAuthenticator");
    //     }
}
