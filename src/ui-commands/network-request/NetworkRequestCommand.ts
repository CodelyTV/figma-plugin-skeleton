import { Command } from "../../commands-setup/Command";

export class NetworkRequestCommand implements Command {
  readonly type = "networkRequest";
  readonly payload: {
    url: string;
  };

  constructor(url: string) {
    this.payload = { url };
  }
}
