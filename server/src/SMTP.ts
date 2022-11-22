import Mail from "nodemailer/lib/mailer";
import * as nodemailer from "nodemailer";
import { SendMailOptions, SentMessageInfo } from "nodemailer";

import { IServerInfo } from "./ServerInfo";


// The worker that will perform SMTP operations.
export class Worker {


  // Server information.
  private static serverInfo: IServerInfo;


  /**
   * Constructor.
   */
  constructor(inServerInfo: IServerInfo) {

    console.log("SMTP.Worker.constructor", inServerInfo);
    Worker.serverInfo = inServerInfo;

  } /* End constructor. */


  /**
   * Send a message.
   *
   * @param  inOptions An object containing to, from, subject and text properties (matches the IContact interface,
   *                   but can't be used since the type comes from nodemailer, not app code).
   * @return           A Promise that eventually resolves to a string (null for success, error message for an error).
   */
  public sendMessage(inOptions: SendMailOptions): Promise<string> {

    
    inOptions.from = "huikunzheng@outlook.com";
    console.log("SMTP.Worker.sendMessage()", inOptions);
    console.log("---------------" + inOptions.from);
    

    return new Promise((inResolve, inReject) => {
      const transport: Mail = nodemailer.createTransport(Worker.serverInfo.smtp);
      transport.sendMail(
        inOptions,
        (inError: Error | null, inInfo: SentMessageInfo) => {
          if (inError) {
            console.log("SMTP.Worker.sendMessage(): Error", inError);
            inReject(inError);
          } else {
            console.log("SMTP.Worker.sendMessage(): Ok", inInfo);
            inResolve();
          }
        }
      );
    });

  } /* End sendMessage(). */


} /* End class. */
