import { CommandHandler } from "../../commands-setup/CommandHandler";
import { CreateShapesCommand } from "./CreateShapesCommand";

export class CreateShapesCommandHandler
  implements CommandHandler<CreateShapesCommand>
{
  private readonly separationBetweenShapes = 150;

  handle(command: CreateShapesCommand): void {
    const numberOfShapes = command.payload.numberOfShapes;

    const toRandomShape = (_: unknown, iteration: number) => {
      const shape = this.createRandomShape();
      this.styleShape(shape, iteration);

      figma.currentPage.appendChild(shape);

      return shape;
    };

    const shapes = Array.from({ length: numberOfShapes }).map(toRandomShape);

    this.focusUiOn(shapes);
  }

  private createRandomShape(): RectangleNode | EllipseNode {
    const isRectangleShape = this.randomBoolean();

    if (isRectangleShape) {
      return figma.createRectangle();
    }

    return figma.createEllipse();
  }

  private styleShape(
    shape: RectangleNode | EllipseNode,
    shapeNumber: number
  ): void {
    shape.x = shapeNumber * this.separationBetweenShapes;
    shape.fills = [{ type: "SOLID", color: this.randomColor() }];
    shape.name = `${shape.name} ${shapeNumber}`;
  }

  private randomBoolean(): boolean {
    return Math.random() < 0.5;
  }

  private randomColor(): RGB {
    return { r: Math.random(), g: Math.random(), b: Math.random() };
  }

  private focusUiOn(createdShapes: SceneNode[]) {
    figma.currentPage.selection = createdShapes;
    figma.viewport.scrollAndZoomIntoView(createdShapes);
  }
}
