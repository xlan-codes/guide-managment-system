import { SendMailOptions } from "../../models/send-mail-options";

export interface IMail {
    sendEmail(mail: SendMailOptions): Promise<void>;
}