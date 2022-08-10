import { Command } from "./Command";

export const postMessage = <CommandType extends Command>(
  command: CommandType
): void => {
  const isFromSceneSandboxToUiIframe = typeof window === "undefined";

  isFromSceneSandboxToUiIframe
    ? figma.ui.postMessage(command)
    : window.parent.postMessage({ pluginMessage: command }, "*");
};
