import {
  NetworkRequestCommand,
  SupportedResponseTypes,
} from "../browser-commands/network-request/NetworkRequestCommand";
import { executeCommand } from "../commands-setup/executeCommand";
import { FigmaPluginApi, FigmaUser } from "../domain/FigmaPluginApi";

export class OfficialFigmaPluginApi implements FigmaPluginApi {
  constructor(private readonly figma: PluginAPI) {}

  currentUser(): FigmaUser {
    const currentUserAvatarUrl = this.figma.currentUser?.photoUrl;
    const currentUserName = this.figma.currentUser?.name;

    if (currentUserAvatarUrl === undefined || currentUserAvatarUrl === null) {
      throw new Error("Current user does not have a photo");
    }

    if (currentUserName === undefined || currentUserName === null) {
      throw new Error("Current user does not have a name");
    }

    return { photoUrl: currentUserAvatarUrl, name: currentUserName };
  }

  notify(message: string): void {
    this.figma.notify(message);
  }

  // 🚩🚩🚩     🚩🚩🚩       🚩🚩🚩         🚩🚩🚩      🚩🚩🚩
  // 🚩🚩🚩        Gente que se flipa desacoplando     🚩🚩🚩
  // 🚩🚩🚩   Tendríamos que modelar nuestro SceneNode 🚩🚩🚩
  // 🚩🚩🚩     🚩🚩🚩       🚩🚩🚩         🚩🚩🚩      🚩🚩🚩
  select(elements: ReadonlyArray<SceneNode>): void {
    this.figma.currentPage.selection = elements;
  }

  request<ResponseType extends SupportedResponseTypes>(
    url: string,
    responseType: ResponseType
  ): Promise<
    ResponseType extends "arraybuffer" ? ArrayBuffer : Record<string, unknown>
  > {
    executeCommand(new NetworkRequestCommand(url, responseType));

    return new Promise((resolve) => {
      this.figma.ui.onmessage = async (command) => {
        this.ensureToOnlyReceiveNetworkRequestResponse(command);

        resolve(command.payload);
      };
    });
  }

  private ensureToOnlyReceiveNetworkRequestResponse(command: { type: string }) {
    if (command.type !== "networkRequestResponse") {
      const errorMessage =
        "Unexpected command received while performing the request for painting the user avatar.";

      throw new Error(errorMessage);
    }
  }
}
