import { Command } from "./Command";

export const postMessage: <CommandType extends Command>(
  command: CommandType
) => void =
  typeof window === "undefined"
    ? function <CommandType extends Command>(command: CommandType): void {
        figma.ui.postMessage(command);
      }
    : function <CommandType extends Command>(command: CommandType): void {
        window.parent.postMessage({ pluginMessage: command }, "*");
      };
