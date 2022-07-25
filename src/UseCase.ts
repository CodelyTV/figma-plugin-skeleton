export class UseCase {
  constructor(private readonly name: string) {}

  execute(): string {
    return `${this.name} executed 🎉`;
  }
}
