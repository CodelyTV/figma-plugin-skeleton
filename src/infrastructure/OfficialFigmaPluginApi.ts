import { FigmaPluginApi } from "../domain/FigmaPluginApi";

export class OfficialFigmaPluginApi implements FigmaPluginApi {
  constructor(private readonly figma: PluginAPI) {}

  notify(message: string): void {
    this.figma.notify(message);
  }
}
