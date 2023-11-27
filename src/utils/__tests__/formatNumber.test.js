import { formatNumber } from "../helpers";

describe('formatNumber', () => {
  it('formats large number to billion (B)', () => {
    expect(formatNumber(1500000000)).toBe('1.5B');
  });

  it('formats large number to million (M)', () => {
    expect(formatNumber(2500000)).toBe('2.5M');
  });

  it('formats large number to thousand (K)', () => {
    expect(formatNumber(7500)).toBe('7.5K');
  });

  it('does not format small numbers', () => {
    expect(formatNumber(500)).toBe(500);
  });

  it('returns the same value for numbers less than 1e3', () => {
    expect(formatNumber(900)).toBe(900);
  });
});