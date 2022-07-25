import { UseCase } from "./UseCase";

figma.showUI(__html__);

const useCase = new UseCase("Pan y Chocolate");

const useCaseOutput = useCase.execute();

console.log(useCaseOutput);
