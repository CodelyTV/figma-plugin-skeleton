import { NetworkRequestCommandHandler } from "../browser-commands/network-request/NetworkRequestCommandHandler";
import { CancelCommandHandler } from "../scene-commands/cancel/CancelCommandHandler";
import { CreateShapesCommandHandler } from "../scene-commands/create-shapes/CreateShapesCommandHandler";
import { PaintCurrentUserAvatarCommandHandler } from "../scene-commands/paint-current-user-avatar/PaintCurrentUserAvatarCommandHandler";
import { Command } from "./Command";
import { CommandHandler } from "./CommandHandler";

// 👋 Add below your new commands.
// Define its arbitrary key and its corresponding Handler class.
// Tip: Declare your Command and CommandHandler classes creating a folder inside the `.src/sandbox-commands` one 😊
export const CommandsMapping: Record<string, () => CommandHandler<Command>> = {
  cancel: () => new CancelCommandHandler(figma),
  createShapes: () => new CreateShapesCommandHandler(figma),
  paintCurrentUserAvatar: () => new PaintCurrentUserAvatarCommandHandler(figma),
  networkRequest: () => new NetworkRequestCommandHandler(),
};
