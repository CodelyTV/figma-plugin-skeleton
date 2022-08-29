import { CommandHandler } from "../../commands-setup/CommandHandler";
import { FigmaPluginApi, FigmaUser } from "../../domain/FigmaPluginApi";
import { PaintCurrentUserAvatarCommand } from "./PaintCurrentUserAvatarCommand";

export class PaintCurrentUserAvatarCommandHandler
  implements CommandHandler<PaintCurrentUserAvatarCommand>
{
  private readonly avatarImageSize = 100;

  constructor(private readonly figma: FigmaPluginApi) {}

  // `command` argument needed due to polymorphism.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async handle(command: PaintCurrentUserAvatarCommand): Promise<void> {
    let currentUser: FigmaUser;

    try {
      currentUser = this.figma.currentUser();
    } catch (e) {
      this.figma.notify("Sorry but you do not have an avatar to add 😅");

      return Promise.resolve();
    }

    const response = await this.figma.request(
      currentUser.photoUrl,
      "arraybuffer"
    );

    await this.createAvatarBadge(response, currentUser.name);
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
