import "figma-plugin-ds/dist/figma-plugin-ds.css";
import "./ui.css";

import { CancelCommand } from "../commands/cancel/CancelCommand";
import { CreateShapesCommand } from "../commands/create-shapes/CreateShapesCommand";
import { Command } from "../commands-setup/Command";

function postMessage(message: Command): void {
  parent.postMessage({ pluginMessage: { message } }, "*");
}

function addButtonEventListeners(): void {
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

addButtonEventListeners();
