import manifest from "../manifest.json";
import { Command } from "./commands-setup/Command";
import { CommandsMapping } from "./commands-setup/CommandsMapping";
import { Greeter } from "./Greeter";

figma.showUI(__html__);

const greet = new Greeter(manifest.name).greet();

figma.notify(greet);

figma.ui.onmessage = ({ message }: { message: Command }) => {
  if (!(message.type in CommandsMapping)) {
    notifyErrorToEndUser(
      `Trying to execute the command \`${message.type}\` but it is not registered in the \`CommandsMapping.ts\` file. If you are the developer, go to the \`CommandsMapping.ts\` file and register it to the const with: \`${message.type}: ${message.type}CommandHandler,\``
    );

    return;
  }

  const commandHandler = new CommandsMapping[message.type]();

  try {
    commandHandler.handle(message);
  } catch (error) {
    notifyErrorToEndUser(
      `"${error}" executing the command \`${message.type}\`. This command is mapped to a class in the \`CommandsMapping.ts\` file. It could be a good starting point to look for the bug 😊`
    );
  }

  figma.closePlugin();
};

function notifyErrorToEndUser(errorMessage: string): void {
  figma.notify(
    `🫣  Error in Figma plugin "${manifest.name}". See the JavaScript console for more info.`,
    { error: true }
  );

  console.error(
    `🫣️ Error in Figma plugin "${manifest.name}"\r\nFigma Plugin ID: "${figma.pluginId}"\r\n\r\n${errorMessage}.`
  );
}
