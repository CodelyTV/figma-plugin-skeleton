import { Command } from "./Command";

export const executeCommand = (command: Command): void => {
  const isFromSceneSandboxToUiIframe = typeof window === "undefined";

  isFromSceneSandboxToUiIframe
    ? figma.ui.postMessage(command)
    : window.parent.postMessage({ pluginMessage: command }, "*");
};
