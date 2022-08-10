import "figma-plugin-ds/dist/figma-plugin-ds.css";
import "./ui.css";

import { executeCommand } from "../commands-setup/executeCommand";
import { handleCommand } from "../commands-setup/handleCommand";
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

        executeCommand(new CreateShapesCommand(count));
        break;
      case "cancel":
        executeCommand(new CancelCommand());
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
