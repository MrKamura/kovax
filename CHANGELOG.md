# [0.5.0](https://github.com/MrKamura/kovax/compare/v0.4.0...v0.5.0) (2026-05-14)


### Features

* **ThemeProvider** with injected CSS variables (`--kx-*`), light/dark palettes, **`data-kovax-theme`** on the document or a scoped **`target`**, optional **`palettes`** overrides and **`nonce`** for CSP
* **`useColorMode`** / **`useTheme`** hooks for controlled toggles and palette inspection
* **`themeToken`** / **`colorToken`** resolve to **`var(--kx-…, fallback)`** strings so components pick up theme changes when the provider is mounted (hex fallbacks preserve rendering without a provider)

### Playground

* Static prerender for routes (**SEO**: `sitemap.xml`, `robots.txt`, per-route meta); live **ThemeProvider** docs section under Components → Theme



# [0.4.0](https://github.com/MrKamura/kovax/compare/v0.3.0...v0.4.0) (2026-05-12)


### Features

* tables, overlays, tabs, accordion, alert, progress, pickers, Textarea ([09a0db1](https://github.com/MrKamura/kovax/commit/09a0db16bfbe4ff829d21c90ffc088a2a9022cb3))



# [0.3.0](https://github.com/MrKamura/kovax/compare/v0.2.0...v0.3.0) (2026-05-12)



# [0.2.0](https://github.com/MrKamura/kovax/compare/02bccd9a3c7f3183c294f815f2277cbe5d437d6b...v0.2.0) (2026-05-12)


### Features

* added HStack and VStack components for layouts ([02bccd9](https://github.com/MrKamura/kovax/commit/02bccd9a3c7f3183c294f815f2277cbe5d437d6b))



