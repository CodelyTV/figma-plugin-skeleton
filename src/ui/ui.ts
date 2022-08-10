import "figma-plugin-ds/dist/figma-plugin-ds.css";
import "./ui.css";

import manifest from "../../manifest.json";
import { Command } from "../commands-setup/Command";
import { CommandsMapping } from "../commands-setup/CommandsMapping";
import { postMessage } from "../commands-setup/postMessage";
import { CancelCommand } from "../scene-commands/cancel/CancelCommand";
import { CreateShapesCommand } from "../scene-commands/create-shapes/CreateShapesCommand";

addUiEventListeners();
registerUiCommandHandlers();

function addUiEventListeners(): void {
  document.addEventListener("click", function (event: MouseEvent) {
    const target = event.target as HTMLElement;

    switch (target.id) {
      case "create":
        const textBox = document.getElementById("count") as HTMLInputElement;
        const countBase = 10;
        const count = parseInt(textBox.value, countBase);

        postMessage(new CreateShapesCommand(count));
        break;
      case "cancel":
        postMessage(new CancelCommand());
        break;
    }
  });
}

function registerUiCommandHandlers() {
  window.onmessage = async (event: MessageEvent) => {
    const command = {
      type: event.data.pluginMessage.type,
      payload: event.data.pluginMessage.payload,
    };

    await handleCommand(command);
  };
}

async function handleCommand(command: Command) {
  if (!(command.type in CommandsMapping)) {
    notifyErrorToEndUser(
      `Trying to execute the command \`${command.type}\` but it is not registered in the \`CommandsMapping.ts\` file. If you are the developer, go to the \`CommandsMapping.ts\` file and register it to the const with: \`${command.type}: ${command.type}CommandHandler,\``
    );

    figma.closePlugin();
    return;
  }

  const commandHandler = CommandsMapping[command.type]();

  try {
    await commandHandler.handle(command);
  } catch (error) {
    notifyErrorToEndUser(
      `"${error}" executing the command \`${command.type}\`. This command is mapped to a class in the \`CommandsMapping.ts\` file. It could be a good starting point to look for the bug 😊`
    );
  } finally {
    const isACommandInsideAnotherCommand = command.type === "networkRequest";

    if (!isACommandInsideAnotherCommand) {
      figma.closePlugin();
    }
  }
}

function notifyErrorToEndUser(errorMessage: string): void {
  figma.notify(
    `🫣  Error in Figma plugin "${manifest.name}". See the JavaScript console for more info.`,
    { error: true }
  );

  console.error(
    `🫣️ Error in Figma plugin "${manifest.name}"\r\nFigma Plugin ID: "${figma.pluginId}"\r\n\r\n${errorMessage}.`
  );
}
