// @ts-nocheck -- run with `bun test`
import { describe, it, expect } from "bun:test";
import { isNoEmailKeyword, isValidEmailOrKeyword } from "./emailBypass";

describe("no-email desk keyword", () => {
  it("accepts 'none' and 'no-email' in any case", () => {
    expect(isNoEmailKeyword("none")).toBe(true);
    expect(isNoEmailKeyword(" NO-EMAIL ")).toBe(true);
  });
  it("treats real emails as real", () => {
    expect(isNoEmailKeyword("grace@gmail.com")).toBe(false);
    expect(isValidEmailOrKeyword("grace@gmail.com")).toBe(true);
  });
  it("still rejects invalid strings", () => {
    expect(isValidEmailOrKeyword("abc")).toBe(false);
    expect(isValidEmailOrKeyword("john@")).toBe(false);
  });
});
