import { NetworkRequestCommand } from "../../browser-commands/network-request/NetworkRequestCommand";
import { CommandHandler } from "../../commands-setup/CommandHandler";
import { PaintCurrentUserAvatarCommand } from "./PaintCurrentUserAvatarCommand";

export class PaintCurrentUserAvatarCommandHandler
  implements CommandHandler<PaintCurrentUserAvatarCommand>
{
  constructor(private readonly figma: PluginAPI) {}

  // `command` argument needed due to polymorphism.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handle(command: PaintCurrentUserAvatarCommand): Promise<void> {
    const currentUserAvatarUrl = this.figma.currentUser?.photoUrl;

    if (currentUserAvatarUrl === undefined || currentUserAvatarUrl === null) {
      this.figma.notify("Sorry but you do not have an avatar to add 😅");

      return Promise.resolve();
    }

    this.figma.ui.postMessage(new NetworkRequestCommand(currentUserAvatarUrl));

    return new Promise((resolve) => {
      this.figma.ui.onmessage = (msg) => {
        console.log(
          "PaintCurrentUserAvatarCommandHandler, this.figma.ui.onmessage received from NetworkRequestCommand:"
        );
        console.log(msg);
        // const text = this.figma.createText();
        // // Make sure the new text node is visible where we're currently looking
        // text.x = this.figma.viewport.center.x;
        // text.y = this.figma.viewport.center.y;
        //
        // await this.figma.loadFontAsync(text.fontName as FontName);
        // text.characters = msg;
        //
        // this.figma.closePlugin();
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
          .then((uint8Array) => this.figma.createImage(uint8Array).hash)
          .then((hash) => {
            const imageWrapper = this.figma.createEllipse();

            imageWrapper.x = 1;
            imageWrapper.fills = [
              { type: "IMAGE", scaleMode: "FILL", imageHash: hash },
            ];
            imageWrapper.name = "Avatar";

            this.figma.currentPage.appendChild(imageWrapper);

            this.figma.currentPage.selection = [imageWrapper];
            this.figma.viewport.scrollAndZoomIntoView([imageWrapper]);
          });
      });*/
  }
}
