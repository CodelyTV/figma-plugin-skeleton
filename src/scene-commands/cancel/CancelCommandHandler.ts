import { CommandHandler } from "../../commands-setup/CommandHandler";
import { FigmaPluginApi } from "../../domain/FigmaPluginApi";
import { CancelCommand } from "./CancelCommand";

export class CancelCommandHandler implements CommandHandler<CancelCommand> {
  constructor(private readonly figma: FigmaPluginApi) {}

  // `command` argument needed due to polymorphism.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handle(command: CancelCommand): void {
    this.figma.notify("👋  Good bye!");
  }
}
