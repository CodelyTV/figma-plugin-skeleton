import { handleCommand } from "./commands-setup/handleCommand";
import { PaintCurrentUserAvatarCommand } from "./scene-commands/paint-current-user-avatar/PaintCurrentUserAvatarCommand";

createInvisibleUiForBrowserApiAccess();

await handleCommand(new PaintCurrentUserAvatarCommand());

function createInvisibleUiForBrowserApiAccess() {
  figma.showUI(__html__, { visible: false });
}
