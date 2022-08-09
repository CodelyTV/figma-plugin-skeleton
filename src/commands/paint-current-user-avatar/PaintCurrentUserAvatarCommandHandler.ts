import { CommandHandler } from "../../commands-setup/CommandHandler";
import { NetworkRequestCommand } from "../../ui-commands/network-request/NetworkRequestCommand";
import { PaintCurrentUserAvatarCommand } from "./PaintCurrentUserAvatarCommand";

export class PaintCurrentUserAvatarCommandHandler
  implements CommandHandler<PaintCurrentUserAvatarCommand>
{
  // `command` argument needed due to polymorphism.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handle(command: PaintCurrentUserAvatarCommand): Promise<void> {
    const currentUserAvatarUrl = figma.currentUser?.photoUrl;

    if (currentUserAvatarUrl === undefined || currentUserAvatarUrl === null) {
      figma.notify("Sorry but you do not have an avatar to add 😅");

      return Promise.resolve();
    }

    figma.ui.postMessage(new NetworkRequestCommand(currentUserAvatarUrl));

    return new Promise((resolve) => {
      figma.ui.onmessage = (msg) => {
        console.log(
          "PaintCurrentUserAvatarCommandHandler, figma.ui.onmessage received from NetworkRequestCommand:"
        );
        console.log(msg);
        resolve();
      };
    });
  }
}
