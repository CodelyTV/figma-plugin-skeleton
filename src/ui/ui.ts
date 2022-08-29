import "figma-plugin-ds/dist/figma-plugin-ds.css";
import "./ui.css";

import { registerUiCommandHandlers } from "./register-ui-command-handlers";
import { registerUiEventListeners } from "./register-ui-event-listeners";

registerUiEventListeners();
registerUiCommandHandlers();
