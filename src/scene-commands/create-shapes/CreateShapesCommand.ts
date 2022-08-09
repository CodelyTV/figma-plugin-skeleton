import { Command } from "../../commands-setup/Command";

export type SupportedShapes = "Rectangle" | "Ellipse";

export class CreateShapesCommand implements Command {
  readonly type = "createShapes";
  readonly payload: {
    numberOfShapes: number;
    typeOfShapes?: SupportedShapes;
  };

  constructor(numberOfShapes: number, typeOfShapes?: SupportedShapes) {
    this.payload = { numberOfShapes, typeOfShapes };
  }
}
