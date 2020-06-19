import { NextFunction, Request, Response, Router } from "express-serve-static-core";
import { createHttpError } from "../utils/httpErrors";
import * as jwt from "jsonwebtoken";
import { container } from "../../inversify.config";
import { UserService } from "../servicies/users.service";
import { TYPES } from "../../types";

const authMiddlware  = (router: Router) => {
    router.use(async (req: Request, res: Response, next: NextFunction) => {

      const userService = container.get<UserService>(TYPES.UserService);
      const authHeaders = req.headers.authorization;
      const a = (authHeaders as string).split(" ");
      if (authHeaders && a[1]) {
        const token = (authHeaders as string).split(" ")[1];
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await userService.findOne({UserId: decoded.UserId});
  
        // if (!user) {
        //   throw createHttpError(401, "User not found.");
        // }
  
        req.user = user;
        next();
  
      } else {
        throw createHttpError(401, "Not authorized.");
      }
          
    });
};


export default [authMiddlware];
