import { ApiServer } from "./api-server";
import { logger } from "./utils/logger";

export const start = (): Promise<void> => {
    return new Promise<void>((resolve, reject)=>{
        const apiService =  new ApiServer();
        apiService.start()
                        .then()
                        .catch((error) => {
                            logger.error(error);
                        });

    });
};