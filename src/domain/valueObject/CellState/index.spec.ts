import { CellState, Colors } from '.';

describe('CellState', () => {
  describe('create', () => {
    it('整数以外の値を渡すとエラーになる', () => {
      expect(() => CellState.create(1.5, '•', Colors.Black)).toThrow('CellState value must be an integer');
    });

    it('負の値を渡すとエラーになる', () => {
      expect(() => CellState.create(-1, '•', Colors.Black)).toThrow('CellState value must be greater than 0');
    });

    it('1文字以外のdisplayを渡すとエラーになる', () => {
      expect(() => CellState.create(1, '••', Colors.Black)).toThrow('CellState display must be a single character');
      expect(() => CellState.create(1, '', Colors.Black)).toThrow('CellState display must be a single character');
    });

    it('整数の値と1文字のdisplayは正常に作成できる', () => {
      const state = CellState.create(1, '•', Colors.Black);
      expect(state.getValue()).toBe(1);
      expect(state.getDisplay()).toBe(`${Colors.Black}•${Colors.Default}`);
    });

    it('色を指定しない場合はデフォルトで白になる', () => {
      const text = '•';
      const state = CellState.create(1, text);
      expect(state.getDisplay()).toBe(`${Colors.White}${text}${Colors.Default}`);
    });
  });

  describe('equals', () => {
    it('同じ値の場合はtrueを返す', () => {
      const state1 = CellState.create(1, '•', Colors.Black);
      const state2 = CellState.create(1, '•', Colors.Black);
      expect(state1.equals(state2)).toBe(true);
    });

    it('異なる値の場合はfalseを返す', () => {
      const state1 = CellState.create(1, '•', Colors.Black);
      const state2 = CellState.create(2, '•', Colors.Black);
      expect(state1.equals(state2)).toBe(false);
    });
  });

  describe('getDisplay', () => {
    it('指定した色で表示される', () => {
      const text = '•';
      const state = CellState.create(1, text, Colors.Red);
      expect(state.getDisplay()).toBe(`${Colors.Red}${text}${Colors.Default}`);
    });
  });

  describe('定数', () => {
    it('DEADは0と空白を持ち、デフォルト色で表示される', () => {
      expect(CellState.DEAD.getValue()).toBe(0);
      expect(CellState.DEAD.getDisplay()).toBe(`${Colors.Default} ${Colors.Default}`);
    });
  });
});
