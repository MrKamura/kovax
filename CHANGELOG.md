# [0.6.0](https://github.com/MrKamura/kovax/compare/v0.5.0...v0.6.0) (2026-05-18)


### Features

* **`Pagination`** — accessible numeric pager (prev/next, ellipsis gaps, `aria-current`), motion via **`duration.*`** / **`easing.*`** tokens, respects **`prefers-reduced-motion`**; optional bundle **`kovax-react/pagination`**
* **`getPaginationItems`** — shared page/ellipsis algorithm for custom layouts
* **`useMediaQuery`**, **`useBreakpointUp`**, **`breakpointMinMediaQuery`**, **`breakpointMinWidth`**, **`breakpointMinMediaQueryFromToken`** — breakpoints aligned with **`breakpoints` / `themeToken("breakpoint.*")`**
* **`npm audit fix`** — dependency updates clearing reported transitive vulnerabilities in the install graph

### Documentation & playground

* **`docs/components/Pagination.md`**, playground **Components → Pagination** (several live examples), Documentation topic **Pagination** with EN/RU UI copy in the playground

### Release notes (Russian) · Заметки о выпуске

Краткое описание для русскоязычной аудитории:

* **`Pagination`** — компонент постраничной навигации с доступностью и плавными переходами по токенам темы; при необходимости подключайте отдельным пакетом **`kovax-react/pagination`**.
* **`getPaginationItems`** — та же логика номеров страниц и многоточий, если нужна своя вёрстка.
* **`useMediaQuery`** и **`useBreakpointUp`** (+ хелперы для **`min-width`**) опираются на те же **`breakpoint.*`**, что и остальная дизайн-система.
* Обновлены **документация** и **площадка** (раздел Pagination, строки интерфейса EN/RU).


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



