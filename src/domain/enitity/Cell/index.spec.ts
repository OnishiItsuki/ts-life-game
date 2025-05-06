import { Cell } from '.';
import { CellState } from '@domain/valueObject/CellState';

describe('セル', () => {
  describe('初期状態', () => {
    let cell: Cell;

    beforeEach(() => {
      cell = Cell.create();
    });

    it('初期状態は死んでいる状態である', () => {
      expect(cell.getCurrentState()).toBe(CellState.DEAD);
    });

    it('初期状態では死んでいる状態の表示を返す', () => {
      expect(cell.getDisplay()).toBe(CellState.DEAD.getDisplay());
    });
  });

  describe('状態の追加と確認', () => {
    let cell: Cell;
    let newState: CellState;

    beforeEach(() => {
      cell = Cell.create();
      newState = CellState.create({ value: 1, display: '•' });
    });

    describe('新しい状態の追加', () => {
      beforeEach(() => {
        cell.addState(newState);
      });

      it('追加した状態を保持している', () => {
        expect(cell.hasState(newState)).toBe(true);
      });

      it('状態一覧に追加した状態が含まれている', () => {
        expect(cell.getStateMaps()).toContain(newState);
      });
    });

    describe('同じ状態の二重追加', () => {
      beforeEach(() => {
        cell.addState(newState);
      });

      it('同じ状態を2回追加すると拒否される', () => {
        expect(() => cell.addState(newState)).toThrow('CellState already exists');
      });
    });
  });

  describe('状態の更新', () => {
    let cell: Cell;
    let state: CellState;

    beforeEach(() => {
      cell = Cell.create();
      state = CellState.create({ value: 1, display: '•' });
    });

    describe('登録済み状態への変化', () => {
      beforeEach(() => {
        cell.addState(state);
        cell.update(state);
      });

      it('セルの状態が正しく変化する', () => {
        expect(cell.getCurrentState()).toBe(state);
      });
    });

    describe('未登録状態への変化', () => {
      let unregisteredState: CellState;

      beforeEach(() => {
        unregisteredState = CellState.create({ value: 1, display: '•' });
      });

      it('未登録の状態への変化は拒否される', () => {
        expect(() => cell.update(unregisteredState)).toThrow('invalid CellState');
      });
    });

    describe('連続更新', () => {
      beforeEach(() => {
        cell.addState(state);
        cell.update(state);
      });

      it('同一ターン中の2回目の変化は拒否される', () => {
        expect(() => cell.update(state)).toThrow('Cell is already updated');
      });
    });
  });

  describe('更新フラグの操作', () => {
    let cell: Cell;
    let state: CellState;

    beforeEach(() => {
      cell = Cell.create();
      state = CellState.create({ value: 1, display: '•' });
    });

    describe('ターン終了後の更新準備', () => {
      beforeEach(() => {
        cell.addState(state);
        cell.update(state);
        cell.setIsUpdatedFalse();
      });

      it('次のターンでは再び状態変化が可能になる', () => {
        expect(() => cell.update(state)).not.toThrow();
      });
    });

    describe('未更新状態でのターン終了処理', () => {
      it('変化していないセルでターン終了処理を行うと拒否される', () => {
        expect(() => cell.setIsUpdatedFalse()).toThrow('Cell is not updated');
      });
    });
  });

  describe('初期化', () => {
    let cell: Cell;
    let state: CellState;

    beforeEach(() => {
      cell = Cell.create();
      state = CellState.create({ value: 1, display: '•' });
    });

    describe('初期状態へのリセット', () => {
      beforeEach(() => {
        cell.addState(state);
        cell.update(state);
        cell.reset();
      });

      it('セルが初期状態に戻る', () => {
        expect(cell.getCurrentState()).toBe(CellState.DEAD);
      });

      it('ターンのリセットも同時に行われる', () => {
        expect(() => cell.update(state)).not.toThrow();
      });
    });

    describe('初期状態の変更', () => {
      let newDefault: CellState;

      beforeEach(() => {
        newDefault = CellState.create({ value: 1, display: '•' });
        cell.setDefaultState(newDefault);
        cell.reset();
      });

      it('設定した初期状態にリセットされる', () => {
        expect(cell.getCurrentState()).toBe(newDefault);
      });
    });
  });

  describe('表示', () => {
    let cell: Cell;
    let state: CellState;

    beforeEach(() => {
      cell = Cell.create();
      state = CellState.create({ value: 1, display: '•' });
      cell.addState(state);
      cell.update(state);
    });

    it('現在の状態に応じた表示が取得できる', () => {
      expect(cell.getDisplay()).toBe(state.getDisplay());
    });
  });
});
