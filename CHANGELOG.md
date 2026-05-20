# [0.8.0](https://github.com/MrKamura/kovax/compare/v0.7.0...v0.8.0) (2026-05-19)


### Features

#### Tailwind CSS v4

* **`kovax-react/tailwind`** — generated `@theme inline` CSS preset; maps every **`--kx-*`** token to Tailwind namespaces (`bg-kx-primary-500`, `p-kx-md`, `rounded-kx-md`, `shadow-kx-sm`, …)
* **`@theme inline`** — utilities resolve **`var(--kx-…)`** at use-site so **ThemeProvider** light/dark palette swaps stay reactive
* Generator: **`src/tailwind/generateTailwindTheme.ts`** → **`dist/tailwind.css`** on **`npm run build`**

### Documentation

* **`docs/TAILWIND.md`** — install, **`@import "kovax-react/tailwind"`**, utility namespace table, Next.js notes
* **Storybook** — **`apps/storybook`**: autoDocs (`tags: ['autodocs']`), **`@storybook/addon-a11y`**, **`@chromatic-com/storybook`** (Visual Tests, ex-`@chromaui/addon-visual-tests`); deployed to **`/storybook`** on GitHub Pages alongside the playground

#### Form library adapters

* **`kovax-react/react-hook-form`** — **`FormField`**, **`FormFieldError`**, **`FieldControl`**; **`useController`** + **`FormControl`** context + ref/value injection (peer **`react-hook-form`**)
* **`kovax-react/tanstack-form`** — same API for **`@tanstack/react-form`** (`form` + `name` or `field` render prop)

#### Theme / FOUC

* **`ColorModeScript`** — Chakra-style blocking inline script; sets **`data-kovax-theme`** before first paint (export from **`kovax-react/server`** and **`kovax-react/tokens`**)
* **`buildColorModeInitScript`** / **`buildColorModeScriptTag`** — copy-paste snippet without React
* **`KOVAX_COLOR_MODE_STORAGE_KEY`**, **`KOVAX_THEME_ATTRIBUTE`** — shared constants with **`ThemeProvider`**

### Release notes (Russian) · Заметки о выпуске

* **`ColorModeScript`** — готовый FOUC-snippet для **`data-kovax-theme`** (как **`ColorModeScript`** у Chakra).
* **Storybook** — **`apps/storybook`**: autoDocs, **`@storybook/addon-a11y`**, **`@chromatic-com/storybook`** (визуальные тесты); деплой на **`/storybook`** рядом с playground.
* **`kovax-react/react-hook-form`** и **`kovax-react/tanstack-form`** — тонкие адаптеры **`FormField`** с автопрокидыванием в **FormControlContext**.
* **`kovax-react/tailwind`** — пресет **Tailwind v4** с **`@theme inline`**: **`bg-kx-primary-500`**, **`p-kx-md`** и др. следуют за **ThemeProvider**.
* Док **Form.md**, **TAILWIND.md** и playground обновлены.


# [0.7.0](https://github.com/MrKamura/kovax/compare/v0.6.0...v0.7.0) (2026-05-19)


### Features

#### Next.js App Router & RSC

* **`"use client"`** — prepended to client-only bundle outputs after **`tsup`** build (`scripts/add-use-client.mjs`); RSC-safe entries stay without the directive
* **`kovax-react/server`** — new entry: RSC-safe **`Box`**, **`Stack`**, **`Container`**, **`Text`**, **`Heading`** (no hooks / context)
* RSC-safe deep imports unchanged: **`kovax-react/typography`**, **`/badge`**, **`/progress`**

#### Accessibility & quality

* **`jest-axe`** — **`expectNoAxeViolations()`** in **`src/test-utils`**; automatic axe pass after every component test via **`setupTests.ts`**
* **`DatePicker`** / **`DateRangePicker`** — **`aria-label`** on popover panel and datetime **`type="time"`** fields

#### Tooling & metadata

* **`.size-limit.json`** — gzip limits per entry bundle; **`npm run size`** / **`npm run size:why`**
* **README** — **size-limit** + **bundlejs.com** badges per entry point
* **npm keywords** — expanded (`design-system`, `nextjs`, `rsc`, `a11y`, `server-components`, …)
* **`@types/react`** / **`@types/react-dom`** — **`^18.0.0 || ^19.0.0`**

### Documentation & playground

* **`docs/NEXTJS_APP_ROUTER.md`** — **`ThemeProvider`** placement, FOUC / **`data-kovax-theme`** inline script, RSC vs client imports
* **Foundation** topic on the playground includes the Next.js guide; **README** / **Getting started** cross-links

### Release notes (Russian) · Заметки о выпуске

* **`"use client"`** в client-бандлах; новый entry **`kovax-react/server`** для Server Components.
* **`jest-axe`** и **`expectNoAxeViolations`** — a11y-проверки во всех component-тестах.
* **size-limit** + бейджи **bundlejs** в README; расширены **keywords** на npm.
* Док **`NEXTJS_APP_ROUTER.md`**: **ThemeProvider**, FOUC, **`data-kovax-theme`**.
* **DatePicker** — **`aria-label`** на панели и полях времени.


# [0.6.0](https://github.com/MrKamura/kovax/compare/v0.5.0...v0.6.0) (2026-05-18)


### Features

#### New components

* **`Avatar`** — photo, initials from **`name`**, or custom **`fallback`**; sizes **`xs`–`xl`**, shapes **`circle` / `rounded`**, semantic **`colorScheme`**; broken **`src`** falls back via **`onError`** — bundle **`kovax-react/avatar`**
* **`Badge`** — status / count pill; variants **`solid` / `outline` / `subtle`**, semantic colors, optional leading **dot**, sizes **`sm` / `md`** — bundle **`kovax-react/badge`**
* **`Menu`** / **`DropdownMenu`** — compound menu on **`Popover`** (`Menu.Root`, **`Menu.Trigger`**, **`Menu.Content`**, **`Menu.Item`**, **`Menu.Separator`**); **`role="menu"`**, arrow / Home / End / Enter / Space keyboard model; optional enter animation (**`motion`**, **`ensureMenuKeyframes`**) — bundle **`kovax-react/menu`**
* **`Skeleton`** — loading placeholders; variants **`pulse` / `shimmer` / `none`**, shapes **`rectangle` / `rounded` / `circle`**, **`text`** line mode; motion from theme tokens — bundle **`kovax-react/skeleton`**
* **`Pagination`** — accessible numeric pager (prev/next, ellipsis gaps, **`aria-current`**), motion via **`duration.*` / `easing.*`**, respects **`prefers-reduced-motion`** — bundle **`kovax-react/pagination`**
* **`getPaginationItems`** — shared page/ellipsis algorithm for custom layouts

#### Responsive & tokens

* **`useMediaQuery`**, **`useBreakpointUp`**, **`breakpointMinMediaQuery`**, **`breakpointMinWidth`**, **`breakpointMinMediaQueryFromToken`** — breakpoints aligned with **`breakpoints` / `themeToken("breakpoint.*")`** (exported from main entry and **`kovax-react/tokens`**)

#### Popover (foundation for Menu)

* **`Popover.Content`** — **`contentRole`**: **`"dialog"`** (default) or **`"menu"`** (arrow / Home / End focus among **`menuitem`** children)
* **`Popover.Trigger`** — **`ariaHasPopup`**: **`"dialog"`** | **`"menu"`**
* **`usePopoverRootContext`** — for custom primitives (e.g. **`Menu.Item`** closing the layer on select)

#### Maintenance

* **`npm audit fix`** — dependency updates clearing reported transitive vulnerabilities in the install graph

### Documentation & playground

* Component docs: **`Avatar.md`**, **`Badge.md`**, **`Menu.md`**, **`Skeleton.md`**, **`Pagination.md`**; **`Tokens.md`** (breakpoint hooks), **`Overlays.md`** (Menu / Popover menu role)
* Playground sections: **Avatar**, **Badge**, **Menu**, **Skeleton**, **Pagination**; Documentation topics; **EN/RU** locale strings; route/SEO entries
* **`docs/blog/`** — publication drafts (Habr, DEV.to); root **`.gitignore`** **`/blog/`** for local-only drafts
* **README** — cover image, **What’s new (v0.6.0)**

### Release notes (Russian) · Заметки о выпуске

* **`Avatar`**, **`Badge`**, **`Menu`**, **`Skeleton`**, **`Pagination`** — новые компоненты с отдельными entry **`kovax-react/*`**.
* **`useMediaQuery` / `useBreakpointUp`** и хелперы **`breakpointMinMediaQuery`** — те же **`breakpoint.*`**, что в CSS и **`themeToken`**.
* **`Popover`** — режим **`contentRole="menu"`** и клавиатурная навигация для меню.
* Обновлены **Markdown-доки**, **playground** (живые примеры, EN/RU), **CHANGELOG**.


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



