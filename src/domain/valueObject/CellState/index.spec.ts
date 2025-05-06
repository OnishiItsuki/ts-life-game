import { CellState, Colors } from '.';

describe('セル状態', () => {
  describe('セル状態の作成', () => {
    describe('数値の検証', () => {
      it('小数点を含む数値は使用できない', () => {
        expect(() =>
          CellState.create({ value: 1.5, display: '•', color: Colors.Black }),
        ).toThrow('CellState value must be an integer');
      });

      it('負の数値は使用できない', () => {
        expect(() =>
          CellState.create({ value: -1, display: '•', color: Colors.Black }),
        ).toThrow('CellState value must be greater than 0');
      });
    });

    describe('表示文字の検証', () => {
      it('複数文字は使用できない', () => {
        expect(() =>
          CellState.create({ value: 1, display: '••', color: Colors.Black }),
        ).toThrow('CellState display must be a single character');
      });

      it('空文字は使用できない', () => {
        expect(() =>
          CellState.create({ value: 1, display: '', color: Colors.Black }),
        ).toThrow('CellState display must be a single character');
      });
    });

    describe('有効なパラメータでの作成', () => {
      let state: CellState;

      beforeEach(() => {
        state = CellState.create({
          value: 1,
          display: '•',
          color: Colors.Black,
        });
      });

      it('指定した数値が正しく設定される', () => {
        expect(state.getValue()).toBe(1);
      });

      it('表示文字は色情報と共に保存される', () => {
        expect(state.getDisplay()).toBe(`${Colors.Black}•${Colors.Default}`);
      });
    });

    describe('デフォルト値の適用', () => {
      let state: CellState;
      const text = '•';

      beforeEach(() => {
        state = CellState.create({ value: 1, display: text });
      });

      it('色指定がない場合は白色が適用される', () => {
        expect(state.getDisplay()).toBe(`${Colors.White}${text}${Colors.Default}`);
      });
    });
  });

  describe('状態の比較', () => {
    describe('同一状態の検出', () => {
      let state1: CellState;
      let state2: CellState;

      beforeEach(() => {
        state1 = CellState.create({
          value: 1,
          display: '•',
          color: Colors.Black,
        });
        state2 = CellState.create({
          value: 1,
          display: '•',
          color: Colors.Black,
        });
      });

      it('同じ値を持つ状態は等価と判定される', () => {
        expect(state1.equals(state2)).toBe(true);
      });
    });

    describe('異なる状態の検出', () => {
      let state1: CellState;
      let state2: CellState;

      beforeEach(() => {
        state1 = CellState.create({
          value: 1,
          display: '•',
          color: Colors.Black,
        });
        state2 = CellState.create({
          value: 2,
          display: '•',
          color: Colors.Black,
        });
      });

      it('異なる値を持つ状態は非等価と判定される', () => {
        expect(state1.equals(state2)).toBe(false);
      });
    });
  });

  describe('表示文字の取得', () => {
    let state: CellState;
    const text = '•';

    beforeEach(() => {
      state = CellState.create({ value: 1, display: text, color: Colors.Red });
    });

    it('指定した色で表示文字を装飾する', () => {
      expect(state.getDisplay()).toBe(`${Colors.Red}${text}${Colors.Default}`);
    });
  });

  describe('定義済み状態', () => {
    it('死滅状態は数値0を持つ', () => {
      expect(CellState.DEAD.getValue()).toBe(0);
    });

    it('死滅状態は空白文字をデフォルト色で表示する', () => {
      expect(CellState.DEAD.getDisplay()).toBe(
        `${Colors.Default} ${Colors.Default}`,
      );
    });
  });
});
