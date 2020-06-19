import { Router } from "express";

type Wrapper = ((router: Router) => void);

export const applyMiddleware = ( middleware: Array<Wrapper>, router: Router) => {
    for (const f of middleware) {
        f(router);
    }
};