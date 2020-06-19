import { IMail } from "./interfaces/mail.interface";
import { injectable } from "inversify";
import { SendMailOptions } from "../models/send-mail-options";
require('dotenv').config();

@injectable()
export class EMailService implements IMail {
    public sendEmail(mail: SendMailOptions): Promise<void> {
        throw new Error("Method not implemented.");
    }


    
}