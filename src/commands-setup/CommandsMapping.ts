import { NetworkRequestCommandHandler } from "../browser-commands/network-request/NetworkRequestCommandHandler";
import { CancelCommandHandler } from "../scene-commands/cancel/CancelCommandHandler";
import { CreateShapesCommandHandler } from "../scene-commands/create-shapes/CreateShapesCommandHandler";
import { PaintCurrentUserAvatarCommandHandler } from "../scene-commands/paint-current-user-avatar/PaintCurrentUserAvatarCommandHandler";
import { Command } from "./Command";
import { CommandHandler } from "./CommandHandler";

// 👋 Add below your new commands.
// Define its arbitrary key and its corresponding Handler class.
// Tip: Declare your Command and CommandHandler classes creating a folder inside the `src/scene-commands` or `src/browser-commands` ones depending on the things you need to get access to (see the README explanation) 😊
export const CommandsMapping: Record<string, () => CommandHandler<Command>> = {
  cancel: () => new CancelCommandHandler(figma),
  createShapes: () => new CreateShapesCommandHandler(figma),
  paintCurrentUserAvatar: () => new PaintCurrentUserAvatarCommandHandler(figma),
  networkRequest: () => new NetworkRequestCommandHandler(),
};
