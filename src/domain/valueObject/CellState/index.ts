import { ConsoleColor, Colors } from './colors';

export { Colors };

export class CellState {
  private readonly value: number;
  private readonly display: string;
  private readonly color: ConsoleColor;

  private constructor(props: {
    value: number;
    display: string;
    color?: ConsoleColor;
  }) {
    const { value, display, color = Colors.White } = props;

    if (!Number.isInteger(value)) {
      throw new Error('CellState value must be an integer');
    }
    if (value < 0) {
      throw new Error('CellState value must be greater than 0');
    }
    if (display.length !== 1) {
      throw new Error('CellState display must be a single character');
    }

    if (!Object.values(Colors).includes(color)) {
      throw new Error('Invalid color');
    }

    this.value = value;
    this.display = display;
    this.color = color;
  }

  static create(props: {
    value: number;
    display: string;
    color?: ConsoleColor;
  }): CellState {
    return new CellState(props);
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

  static readonly DEAD = CellState.create({
    value: 0,
    display: ' ',
    color: Colors.Default,
  });
}
