import { Command } from "./Command";

export abstract class CommandHandler<CommandType extends Command> {
  abstract handle(command: CommandType): Promise<void> | void;
}
