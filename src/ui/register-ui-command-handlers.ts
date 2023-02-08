import { Command } from "../commands-setup/Command";
import { handleCommand } from "../commands-setup/handleCommand";

export function registerUiCommandHandlers(): void {
	window.onmessage = async (
		event: MessageEvent<{
			pluginMessage: Command;
		}>
	) => {
		const command = {
			type: event.data.pluginMessage.type,
			payload: event.data.pluginMessage.payload,
		};

		await handleCommand(command);
	};
}
