import "figma-plugin-ds/dist/figma-plugin-ds.css";
import "./ui.css";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function postMessage({ type, payload }: { type: string; payload?: any }): void {
  parent.postMessage({ pluginMessage: { type, payload } }, "*");
}

function addButtonEventListeners(): void {
  document.addEventListener("click", function (event: MouseEvent) {
    const target = event.target as HTMLElement;

    switch (target.id) {
      case "create":
        const textBox = document.getElementById("count") as HTMLInputElement;
        console.log(textBox.value);
        console.log(textBox);
        const countBase = 10;
        const count = parseInt(textBox.value, countBase);

        postMessage({ type: "create-shapes", payload: count });
        break;
      case "cancel":
        postMessage({ type: "cancel" });
        break;
    }
  });
}

addButtonEventListeners();
