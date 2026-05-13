import { createContext, useContext } from "react";
import type { SiteRoute } from "./siteRoutes";

export interface SiteNavContextValue {
  baseUrl: string;
  route: SiteRoute;
  navigate: (next: SiteRoute, replace?: boolean) => void;
}

export const SiteNavContext = createContext<SiteNavContextValue | null>(null);

export function useSiteNav(): SiteNavContextValue {
  const v = useContext(SiteNavContext);
  if (!v) {
    throw new Error("useSiteNav must be used within SiteNavContext.Provider");
  }
  return v;
}
