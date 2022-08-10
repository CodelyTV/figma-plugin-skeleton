import { NetworkRequestCommand } from "../../browser-commands/network-request/NetworkRequestCommand";
import { CommandHandler } from "../../commands-setup/CommandHandler";
import { executeCommand } from "../../commands-setup/executeCommand";
import { PaintCurrentUserAvatarCommand } from "./PaintCurrentUserAvatarCommand";

export class PaintCurrentUserAvatarCommandHandler
  implements CommandHandler<PaintCurrentUserAvatarCommand>
{
  private readonly avatarImageSize = 100;

  constructor(private readonly figma: PluginAPI) {}

  // `command` argument needed due to polymorphism.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handle(command: PaintCurrentUserAvatarCommand): Promise<void> {
    const currentUserAvatarUrl = this.figma.currentUser?.photoUrl;
    const currentUserName = this.figma.currentUser?.name;

    if (currentUserAvatarUrl === undefined || currentUserAvatarUrl === null) {
      this.figma.notify("Sorry but you do not have an avatar to add 😅");

      return Promise.resolve();
    }

    const responseType = "arraybuffer";
    executeCommand(
      new NetworkRequestCommand(currentUserAvatarUrl, responseType)
    );

    return new Promise((resolve) => {
      this.figma.ui.onmessage = async (command) => {
        this.ensureToOnlyReceiveNetworkRequestResponse(command);

        await this.createAvatarBadge(
          command.payload as ArrayBuffer,
          currentUserName as string
        );
        resolve();
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

  private async createAvatarBadge(
    imageBuffer: ArrayBuffer,
    userName: string
  ): Promise<void> {
    const avatarImage = this.createAvatarImage(imageBuffer, userName);
    const userNameText = await this.createAvatarText(userName);

    const elementsToFocus = [avatarImage, userNameText];
    this.figma.currentPage.selection = elementsToFocus;
    this.figma.viewport.scrollAndZoomIntoView(elementsToFocus);
  }

  private createAvatarImage(
    avatarImage: ArrayBuffer,
    currentUserName: string
  ): EllipseNode {
    const imageUint8Array = new Uint8Array(avatarImage);
    const figmaImage = this.figma.createImage(imageUint8Array);
    const imageWrapper = this.figma.createEllipse();

    imageWrapper.x = this.figma.viewport.center.x;
    imageWrapper.y = this.figma.viewport.center.y;
    imageWrapper.resize(this.avatarImageSize, this.avatarImageSize);
    imageWrapper.fills = [
      { type: "IMAGE", scaleMode: "FILL", imageHash: figmaImage.hash },
    ];
    imageWrapper.name = `${currentUserName} avatar`;

    this.figma.currentPage.appendChild(imageWrapper);

    return imageWrapper;
  }

  private async createAvatarText(userName: string): Promise<TextNode> {
    const userNameText = this.figma.createText();
    userNameText.x = this.figma.viewport.center.x - userName.length / 2;
    userNameText.y =
      this.figma.viewport.center.y +
      this.avatarImageSize +
      this.avatarImageSize / 12;

    await this.figma.loadFontAsync(userNameText.fontName as FontName);
    userNameText.characters = userName;
    userNameText.fontSize = 14;

    return userNameText;
  }
}
