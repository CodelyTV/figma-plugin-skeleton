import { CommandHandler } from "../../commands-setup/CommandHandler";
import { executeCommand } from "../../commands-setup/executeCommand";
import { NetworkRequestCommand } from "./NetworkRequestCommand";

export class NetworkRequestCommandHandler
  implements CommandHandler<NetworkRequestCommand>
{
  async handle(command: NetworkRequestCommand): Promise<void> {
    const url = `https://cors-anywhere.herokuapp.com/${command.payload.url}`;
    const method = "GET";

    return new Promise((resolve) => {
      const request = new XMLHttpRequest();
      request.open(method, url);
      request.responseType = command.payload.responseType;
      request.onload = () => {
        const commandToPost = {
          type: "networkRequestResponse",
          payload: request.response,
        };

        executeCommand(commandToPost);
        resolve();
      };
      request.send();
    });
  }
}
