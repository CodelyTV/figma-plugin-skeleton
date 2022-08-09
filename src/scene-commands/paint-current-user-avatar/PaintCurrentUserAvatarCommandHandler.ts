import { NetworkRequestCommand } from "../../browser-commands/network-request/NetworkRequestCommand";
import { CommandHandler } from "../../commands-setup/CommandHandler";
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
        // const text = figma.createText();
        // // Make sure the new text node is visible where we're currently looking
        // text.x = figma.viewport.center.x;
        // text.y = figma.viewport.center.y;
        //
        // await figma.loadFontAsync(text.fontName as FontName);
        // text.characters = msg;
        //
        // figma.closePlugin();
        resolve();
      };
    });

    /*fetch(currentUserAvatarUrl)
      .then((response) => response.blob())
      .then((blob) => {
        console.log(blob);

        const lele = new Response(blob)
          .arrayBuffer()
          .then((buffer) => new Uint8Array(buffer))
          .then((uint8Array) => figma.createImage(uint8Array).hash)
          .then((hash) => {
            const imageWrapper = figma.createEllipse();

            imageWrapper.x = 1;
            imageWrapper.fills = [
              { type: "IMAGE", scaleMode: "FILL", imageHash: hash },
            ];
            imageWrapper.name = "Avatar";

            figma.currentPage.appendChild(imageWrapper);

            figma.currentPage.selection = [imageWrapper];
            figma.viewport.scrollAndZoomIntoView([imageWrapper]);
          });
      });*/
  }
}
