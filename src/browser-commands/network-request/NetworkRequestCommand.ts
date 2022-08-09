import { Command } from "../../commands-setup/Command";

type SupportedResponseTypes = "text" | "arraybuffer";

export class NetworkRequestCommand implements Command {
  readonly type = "networkRequest";
  readonly payload: {
    url: string;
    responseType: SupportedResponseTypes;
  };

  constructor(url: string, responseType: SupportedResponseTypes) {
    this.payload = { url, responseType };
  }
}
