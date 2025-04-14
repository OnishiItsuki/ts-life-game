import { ConsoleColor, Colors } from './colors';

export { Colors };

export class CellState {
  private readonly value: number;
  private readonly display: string;
  private readonly color: ConsoleColor;

  private constructor(value: number, display: string, color: ConsoleColor) {
    if (!Number.isInteger(value)) {
      throw new Error('CellState value must be an integer');
    }
    if (value < 0) {
      throw new Error('CellState value must be greater than 0');
    }
    if (display.length !== 1) {
      throw new Error('CellState display must be a single character');
    }

    if (!Object.keys(Colors).includes(color)) {
      throw new Error('Invalid color');
    }

    this.value = value;
    this.display = display;
    this.color = color;
  }

  static create(value: number, display: string, color: ConsoleColor = Colors.White): CellState {
    return new CellState(value, display, color);
  }

  equals(other: CellState): boolean {
    return this.value === other.value;
  }

  getValue(): number {
    return this.value;
  }

  getDisplay(): string {
    return `${this.color}${this.display}${Colors.Default}`;
  }

  static readonly DEAD = CellState.create(0, ' ', Colors.Default);
}
