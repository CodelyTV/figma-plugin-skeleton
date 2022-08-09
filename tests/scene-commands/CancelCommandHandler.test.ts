import { mock } from "jest-mock-extended";

import { CancelCommand } from "../../src/scene-commands/cancel/CancelCommand";
import { CancelCommandHandler } from "../../src/scene-commands/cancel/CancelCommandHandler";

describe("CancelCommandHandler", () => {
  it("can be instantiated without throwing errors", () => {
    const figmaPluginApiMock = mock<PluginAPI>();

    const cancelCommandHandlerInstantiator = () => {
      new CancelCommandHandler(figmaPluginApiMock);
    };

    expect(cancelCommandHandlerInstantiator).not.toThrow(TypeError);
  });

  it("notifies the end used with a farewell message", () => {
    const figmaPluginApiMock = mock<PluginAPI>();
    const cancelCommandHandler = new CancelCommandHandler(figmaPluginApiMock);
    const randomCancelCommand = new CancelCommand();

    cancelCommandHandler.handle(randomCancelCommand);

    const farewellMessage = "👋  Good bye!";
    expect(figmaPluginApiMock.notify).toHaveBeenCalledWith(farewellMessage);
  });
});
