import { Command } from "../../commands-setup/Command";

export class CreateShapesCommand implements Command {
  readonly type = "createShapes";
  readonly payload: { numberOfShapes: number };

  constructor(numberOfShapes: number) {
    this.payload = { numberOfShapes };
  }
}
