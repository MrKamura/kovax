import { act, renderHook } from "@testing-library/react";
import {
  breakpointMinMediaQuery,
  breakpointMinMediaQueryFromToken,
  breakpointMinWidth,
} from "../mediaQuery";
import { useBreakpointUp, useMediaQuery } from "../useMediaQuery";

describe("breakpoint helpers", () => {
  it("breakpointMinWidth returns raw em token", () => {
    expect(breakpointMinWidth("md")).toBe("48em");
  });

  it("breakpointMinMediaQuery wraps min-width", () => {
    expect(breakpointMinMediaQuery("md")).toBe("(min-width: 48em)");
  });

  it("breakpointMinMediaQueryFromToken matches breakpointMinMediaQuery", () => {
    expect(breakpointMinMediaQueryFromToken("breakpoint.md")).toBe(
      breakpointMinMediaQuery("md"),
    );
  });
});

describe("useMediaQuery", () => {
  type Listener = (event: MediaQueryListEvent) => void;

  let listenersByQuery: Map<string, Set<Listener>>;
  let matchesByQuery: Map<string, boolean>;

  beforeEach(() => {
    listenersByQuery = new Map();
    matchesByQuery = new Map();

    Object.defineProperty(window, "matchMedia", {
      writable: true,
      configurable: true,
      value: jest.fn((query: string) => {
        if (!listenersByQuery.has(query)) listenersByQuery.set(query, new Set());
        return {
          get matches() {
            return matchesByQuery.get(query) ?? false;
          },
          media: query,
          addEventListener: (_type: string, listener: Listener) => {
            listenersByQuery.get(query)!.add(listener);
          },
          removeEventListener: (_type: string, listener: Listener) => {
            listenersByQuery.get(query)!.delete(listener);
          },
          dispatchEvent: jest.fn(),
          onchange: null,
        };
      }),
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  function emitChange(query: string, matches: boolean) {
    matchesByQuery.set(query, matches);
    listenersByQuery.get(query)?.forEach((listener) => {
      listener({ matches } as MediaQueryListEvent);
    });
  }

  it("reflects initial matchMedia.matches", () => {
    const query = "(min-width: 48em)";
    matchesByQuery.set(query, true);
    const { result } = renderHook(() => useMediaQuery(query));
    expect(result.current).toBe(true);
  });

  it("updates when the query stops matching", () => {
    const query = "(min-width: 48em)";
    matchesByQuery.set(query, true);
    const { result } = renderHook(() => useMediaQuery(query));
    expect(result.current).toBe(true);

    act(() => {
      emitChange(query, false);
    });
    expect(result.current).toBe(false);
  });

  it("useBreakpointUp binds token breakpoints", () => {
    const query = breakpointMinMediaQuery("md");
    matchesByQuery.set(query, true);
    const { result } = renderHook(() => useBreakpointUp("md"));
    expect(result.current).toBe(true);

    act(() => {
      emitChange(query, false);
    });
    expect(result.current).toBe(false);
  });

  it("respects defaultMatches when matchMedia is missing", () => {
    const prev = window.matchMedia;
    Reflect.defineProperty(window, "matchMedia", {
      configurable: true,
      writable: true,
      value: undefined,
    });
    try {
      const { result } = renderHook(() =>
        useMediaQuery("(min-width: 999em)", { defaultMatches: true }),
      );
      expect(result.current).toBe(true);
    } finally {
      Reflect.defineProperty(window, "matchMedia", {
        configurable: true,
        writable: true,
        value: prev,
      });
    }
  });
});
