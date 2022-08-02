export class Greeter {
  constructor(private readonly pluginName: string) {}

  greet(): string {
    return `${this.pluginName} successfully executed 🎉`;
  }
}
