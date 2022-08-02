import { CommandsMapping } from "./CommandsMapping";

export interface Command {
  readonly type: keyof typeof CommandsMapping;
  readonly payload?: unknown;
}
