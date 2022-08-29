import { handleCommand } from "../commands-setup/handleCommand";

export function registerUiCommandHandlers() {
  window.onmessage = async (event: MessageEvent) => {
    const command = {
      type: event.data.pluginMessage.type,
      payload: event.data.pluginMessage.payload,
    };

    await handleCommand(command);
  };
}
