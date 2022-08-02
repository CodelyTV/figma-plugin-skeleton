import { CommandHandler } from "../../commands-setup/CommandHandler";
import { CancelCommand } from "./CancelCommand";

export class CancelCommandHandler implements CommandHandler<CancelCommand> {
  handle(command: CancelCommand): void {
    figma.notify("👋  Good bye!");
  }
}
