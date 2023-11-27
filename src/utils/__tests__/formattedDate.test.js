import { vi } from "vitest";
import { formattedDate } from "../helpers";

describe('formattedDate', () => {
  it('formats date in Indonesian locale', () => {
    const mockDate = new Date(2023, 10, 25);
    global.Date = vi.fn(() => mockDate);
    expect(formattedDate('2023-11-25')).toBe('25 Nov 2023');
    global.Date = Date;
  });
})