import { CommandHandler } from "../../commands-setup/CommandHandler";
import { CreateShapesCommand, SupportedShapes } from "./CreateShapesCommand";

export class CreateShapesCommandHandler
  implements CommandHandler<CreateShapesCommand>
{
  private readonly separationBetweenShapes = 150;

  constructor(private readonly figma: PluginAPI) {}

  handle({
    payload: { numberOfShapes, typeOfShapes },
  }: CreateShapesCommand): void {
    const shapes = Array.from({ length: numberOfShapes }).map(
      this.toShape(typeOfShapes)
    );

    this.focusUiOn(shapes);
  }

  private toShape(
    typeOfShapes?: SupportedShapes
  ): (_: unknown, iteration: number) => SceneNode {
    return (_: unknown, iteration: number): SceneNode => {
      const hasToRandomizeShapeTypes = typeOfShapes === undefined;

      const shapesCreator = hasToRandomizeShapeTypes
        ? this.createRandomShape.bind(this)
        : this.createShape(typeOfShapes);

      const shape = shapesCreator();
      this.styleShape(shape, iteration);

      this.figma.currentPage.appendChild(shape);

      return shape;
    };
  }

  private createShape(
    typeOfShapes: SupportedShapes
  ): () => RectangleNode | EllipseNode {
    return (): RectangleNode | EllipseNode =>
      typeOfShapes === "Rectangle"
        ? this.figma.createRectangle()
        : this.figma.createEllipse();
  }

  private createRandomShape(): RectangleNode | EllipseNode {
    const isRectangleShape = this.randomBoolean();

    if (isRectangleShape) {
      return this.figma.createRectangle();
    }

    return this.figma.createEllipse();
  }

  private styleShape(
    shape: RectangleNode | EllipseNode,
    shapeNumber: number
  ): void {
    shape.x = shapeNumber * this.separationBetweenShapes;
    shape.rotation = Math.random() * 100;
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
    this.figma.currentPage.selection = createdShapes;
    this.figma.viewport.scrollAndZoomIntoView(createdShapes);
  }
}
