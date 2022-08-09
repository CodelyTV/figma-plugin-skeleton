import manifest from "../manifest.json";
import { Command } from "./commands-setup/Command";
import { CommandsMapping } from "./commands-setup/CommandsMapping";

registerPluginMenuCommandHandlers();
registerPluginMenuCommandParametersSuggestions();
registerPluginUiCommandHandlers();

function registerPluginMenuCommandHandlers() {
  figma.on("run", async (event: RunEvent) => {
    const hasToAccessPluginIframe = event.command === "showUi";
    if (hasToAccessPluginIframe) {
      figma.showUI(__html__, { themeColors: true });
      return;
    }

    createInvisibleUiForBrowserApiAccess();

    const command = {
      type: event.command,
      payload: event.parameters,
    };

    await handleCommand(command);
  });
}

function registerPluginMenuCommandParametersSuggestions() {
  figma.parameters.on(
    "input",
    async ({ key, query, result }: ParameterInputEvent) => {
      switch (key) {
        case "typeOfShapes":
          const shapes = ["Rectangle", "Ellipse"];
          const queryMatchingShapes = shapes.filter((s) => s.startsWith(query));

          result.setSuggestions(queryMatchingShapes);
          break;
        default:
          break;
      }
    }
  );
}

function registerPluginUiCommandHandlers() {
  figma.ui.onmessage = async ({ message }: { message: Command }) =>
    await handleCommand(message);
}

async function handleCommand(command: Command): Promise<void> {
  if (!(command.type in CommandsMapping)) {
    notifyErrorToEndUser(
      `Trying to execute the command \`${command.type}\` but it is not registered in the \`CommandsMapping.ts\` file. If you are the developer, go to the \`CommandsMapping.ts\` file and register it to the const with: \`${command.type}: ${command.type}CommandHandler,\``
    );

    figma.closePlugin();
    return;
  }

  const commandHandler = new CommandsMapping[command.type]();

  try {
    await commandHandler.handle(command);
  } catch (error) {
    notifyErrorToEndUser(
      `"${error}" executing the command \`${command.type}\`. This command is mapped to a class in the \`CommandsMapping.ts\` file. It could be a good starting point to look for the bug 😊`
    );
  } finally {
    figma.closePlugin();
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

function createInvisibleUiForBrowserApiAccess() {
  figma.showUI(__html__, { visible: false });
}
