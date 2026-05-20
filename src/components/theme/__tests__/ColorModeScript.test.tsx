import { render } from "@testing-library/react";
import { ColorModeScript } from "../ColorModeScript";
import {
  buildColorModeInitScript,
  buildColorModeScriptTag,
} from "../colorModeScriptSnippet";
import {
  KOVAX_COLOR_MODE_STORAGE_KEY,
  KOVAX_THEME_ATTRIBUTE,
} from "../themeConstants";

describe("buildColorModeInitScript", () => {
  it("reads storage, resolves system, and sets data-kovax-theme", () => {
    const script = buildColorModeInitScript();
    expect(script).toContain(JSON.stringify(KOVAX_COLOR_MODE_STORAGE_KEY));
    expect(script).toContain(JSON.stringify(KOVAX_THEME_ATTRIBUTE));
    expect(script).toContain('localStorage.getItem(k)');
    expect(script).toContain('prefers-color-scheme: dark');
    expect(script).toContain("document.documentElement.setAttribute");
  });

  it("honours custom storageKey and defaultColorMode", () => {
    const script = buildColorModeInitScript({
      storageKey: "app-theme",
      defaultColorMode: "dark",
    });
    expect(script).toContain('"app-theme"');
    expect(script).toContain('"dark"');
  });
});

describe("buildColorModeScriptTag", () => {
  it("wraps script in a tag with optional nonce", () => {
    expect(buildColorModeScriptTag()).toMatch(/^<script>/);
    expect(buildColorModeScriptTag({ nonce: "abc123" })).toContain(
      'nonce="abc123"',
    );
  });
});

describe("ColorModeScript", () => {
  it("renders an inline script element", () => {
    const { container } = render(
      <ColorModeScript defaultColorMode="system" nonce="n" />,
    );
    const el = container.querySelector("script");
    expect(el).toBeTruthy();
    expect(el?.getAttribute("nonce")).toBe("n");
    expect(el?.innerHTML).toContain(KOVAX_THEME_ATTRIBUTE);
  });
});
