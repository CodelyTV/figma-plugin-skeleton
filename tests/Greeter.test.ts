import { Greeter } from "../src/Greeter";

describe("Greeter", () => {
  it("can be instantiated without throwing errors", () => {
    const randomUseCaseInstantiator = () => {
      new Greeter("Random Plugin Name");
    };

    expect(randomUseCaseInstantiator).not.toThrow(TypeError);
  });

  it("can be executed", () => {
    const randomUseCase = new Greeter("Random Plugin Name");

    const expectedOutput = "Random Plugin Name successfully executed 🎉";

    expect(randomUseCase.greet()).toEqual(expectedOutput);
  });
});
