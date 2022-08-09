import { CommandHandler } from "../../commands-setup/CommandHandler";
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
      request.responseType = "text";
      request.onload = () => {
        const commandToPost = {
          type: "networkRequestResponse",
          response: request.response,
        };

        window.parent.postMessage({ pluginMessage: commandToPost }, "*");
        resolve();
      };
      request.send();
    });
  }
}
