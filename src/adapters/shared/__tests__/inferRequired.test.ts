import { inferRequiredFromRules } from "../inferRequired";

describe("inferRequiredFromRules", () => {
  it("detects boolean and message required rules", () => {
    expect(inferRequiredFromRules({ required: true })).toBe(true);
    expect(inferRequiredFromRules({ required: "Required field" })).toBe(true);
    expect(inferRequiredFromRules({ required: { value: true, message: "x" } })).toBe(
      true,
    );
    expect(inferRequiredFromRules({ required: { value: false } })).toBe(false);
    expect(inferRequiredFromRules(undefined)).toBe(false);
  });
});
