import { CancelCommandHandler } from "../commands/cancel/CancelCommandHandler";
import { CreateShapesCommandHandler } from "../commands/create-shapes/CreateShapesCommandHandler";
import { PaintCurrentUserAvatarCommandHandler } from "../commands/paint-current-user-avatar/PaintCurrentUserAvatarCommandHandler";
import { NetworkRequestCommandHandler } from "../ui-commands/network-request/NetworkRequestCommandHandler";
import { Command } from "./Command";
import { CommandHandler } from "./CommandHandler";
import { Newable } from "./Newable";

// 👋 Add below your new commands.
// Define its arbitrary key and its corresponding Handler class.
// Tip: Declare your Command and CommandHandler classes creating a folder inside the `.src/commands` one 😊
export const CommandsMapping: Record<
  string,
  Newable<CommandHandler<Command>>
> = {
  cancel: CancelCommandHandler,
  createShapes: CreateShapesCommandHandler,
  paintCurrentUserAvatar: PaintCurrentUserAvatarCommandHandler,
  networkRequest: NetworkRequestCommandHandler,
};
