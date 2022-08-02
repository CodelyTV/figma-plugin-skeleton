import { CommandHandler } from "../../commands-setup/CommandHandler";
import { CancelCommand } from "./CancelCommand";

export class CancelCommandHandler implements CommandHandler<CancelCommand> {
  // `command` argument needed due to polymorphism.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handle(command: CancelCommand): void {
    figma.notify("👋  Good bye!");
  }
}
