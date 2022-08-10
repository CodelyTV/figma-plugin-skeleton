import manifest from "../../manifest.json";
import { Command } from "./Command";
import { CommandsMapping } from "./CommandsMapping";

export async function handleCommand(command: Command): Promise<void> {
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
