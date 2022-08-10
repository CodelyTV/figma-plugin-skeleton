import { Command } from "./commands-setup/Command";
import { handleCommand } from "./commands-setup/handleCommand";

registerPluginMenuCommandHandlers();
registerPluginMenuCommandParametersSuggestions();
registerPluginUiCommandHandlers();

function registerPluginMenuCommandHandlers() {
  figma.on("run", async (event: RunEvent) => {
    const hasToAccessPluginIframe = event.command === "showUi";
    if (hasToAccessPluginIframe) {
      figma.showUI(__html__, { themeColors: true });
      figma.ui.resize(450, 300);
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
  figma.ui.onmessage = async <CommandType extends Command>(
    command: CommandType
  ) => await handleCommand(command);
}

function createInvisibleUiForBrowserApiAccess() {
  figma.showUI(__html__, { visible: false });
}
