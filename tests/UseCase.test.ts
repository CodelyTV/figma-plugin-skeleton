import { UseCase } from "../src/UseCase";

describe("UseCase", () => {
  it("can be instantiated without throwing errors", () => {
    const randomUseCaseInstantiator = () => {
      new UseCase("Pan y Chocolate");
    };

    expect(randomUseCaseInstantiator).not.toThrow(TypeError);
  });

  it("can be executed", () => {
    const randomUseCase = new UseCase("Pan y Chocolate");

    const expectedOutput = "Pan y Chocolate executed 🎉";

    expect(randomUseCase.execute()).toEqual(expectedOutput);
  });
});
