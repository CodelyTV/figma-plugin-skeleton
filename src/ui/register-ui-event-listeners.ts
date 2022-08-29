import { executeCommand } from "../commands-setup/executeCommand";
import { CancelCommand } from "../scene-commands/cancel/CancelCommand";
import { CreateShapesCommand } from "../scene-commands/create-shapes/CreateShapesCommand";

export function registerUiEventListeners(): void {
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
