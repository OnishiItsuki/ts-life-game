import { CellState } from '@domain/valueObject/CellState';

export class Cell {
  private __defaultState: CellState;

  private __isUpdated: boolean = false;
  private __currentState: CellState;
  private __stateMaps: CellState[] = [];

  constructor() {
    this.__defaultState = CellState.DEAD;
    this.__currentState = this.__defaultState;
    this.__stateMaps = [];
    this.reset();
  }

  static create(): Cell {
    return new Cell();
  }

  public reset(): void {
    this.__isUpdated = false;
    this.__currentState = this.__defaultState;
  }

  public setIsUpdatedFalse(): void {
    if (!this.__isUpdated) {
      throw new Error('Cell is not updated');
    }

    this.__isUpdated = false;
  }

  public setDefaultState(cellState: CellState): void {
    this.__defaultState = cellState;
  }

  public addState(newCellState: CellState): void {
    if (this.__stateMaps.some((state) => state === newCellState)) {
      throw new Error('CellState already exists');
    }
    this.__stateMaps.push(newCellState);
  }

  public getStateMaps(): CellState[] {
    return this.__stateMaps;
  }

  public getCurrentState(): CellState {
    return this.__currentState;
  }

  public getDisplay(): string {
    return this.__currentState.getDisplay();
  }

  public hasState(cellState: CellState): boolean {
    return this.__stateMaps.some((state) => state === cellState);
  }

  public update(newCellState: CellState): void {
    if (this.__isUpdated) {
      throw new Error('Cell is already updated');
    }

    if (!this.hasState(newCellState)) {
      throw new Error(`invalid CellState: ${newCellState.getValue()}`);
    }

    this.__currentState = newCellState;
    this.__isUpdated = true;
  }
}
