# Kovax UI documentation

Component and foundation docs live next to this file. Links are relative to the repository root.

## Foundation

- [Design tokens](./components/Tokens.md) — palettes, spacing, typography, motion, z-index, breakpoints. Live gallery: **Components → Design tokens** on the [playground](https://mrkamura.github.io/kovax/).

## Components

### Layout

- [Box](./components/Layout/Box.md)
- [Flex](./components/Layout/Flex.md)
- [Grid](./components/Layout/Grid.md)
- [Stack / HStack / VStack](./components/Layout/Stack.md)
- [Center](./components/Layout/Center.md)
- [Container](./components/Layout/Container.md)
- [AspectRatio](./components/Layout/AspectRatio.md)
- [Separator](./components/Layout/Separator.md)
- [Bleed](./components/Layout/Bleed.md)
- [VisuallyHidden](./components/Layout/VisuallyHidden.md)
- [Sticky](./components/Layout/Sticky.md)

### Typography

- [Text](./components/Typography/Text.md)
- [Heading](./components/Typography/Heading.md)
- [Link](./components/Typography/Link.md)
- [Code / Kbd](./components/Typography/Code.md)
- [Blockquote](./components/Typography/Blockquote.md)
- [List / ListItem](./components/Typography/List.md)
- [Avatar](./components/Avatar.md) — photo / initials / custom fallback (`kovax-react/avatar`)
- [Badge](./components/Badge.md) — status / count pills (`kovax-react/badge`)

### Forms

- [Form primitives](./components/Form.md) — `FormControl`, `FormLabel`, `FormError`, `FormHelperText`, `FormGroup`
- [Input](./components/Input.md)
- [Textarea](./components/Textarea.md)
- [Checkbox / Radio / Switch](./components/Controls.md)
- [Select & Combobox](./components/Select.md)
- [Date picker](./components/DatePicker.md) — `DatePicker`, `DateRangePicker` (react-day-picker + Kovax Popover)
- [Tooltip, Dialog, Modal, Toast & Popover](./components/Overlays.md)
- [Menu / DropdownMenu](./components/Menu.md) — anchored `role="menu"` on Popover, enter animation (`kovax-react/menu`)

### Other

- [Tabs](./components/Tabs.md) — `Tabs.Root`, `Tabs.List`, `Tabs.Trigger`, `Tabs.Content`
- [Accordion & Collapsible](./components/Accordion.md) — `Collapsible.*`, `Accordion.*`
- [Alert](./components/Alert.md) — inline banner / live region (`tone`, optional dismiss)
- [Progress](./components/Progress.md) — `LinearProgress`, `CircularProgress` (`indeterminate`, palettes)
- [Skeleton](./components/Skeleton.md) — loading placeholders (`pulse`, `shimmer`, `none`; `kovax-react/skeleton`)
- [Table](./components/Table.md) — `Table` primitives + `DataTable` (columns/rows, optional sort)
- [Pagination](./components/Pagination.md) — `Pagination`, `getPaginationItems` (token-backed motion; `kovax-react/pagination`)
- [Button](./components/Button.md)

## Guides

- [Tailwind CSS v4](./TAILWIND.md) — `@import "kovax-react/tailwind"`; `bg-kx-primary-500`, theme-reactive utilities
- [Quick start](./QUICK_START.md) — minimal React & Next.js setup (install, imports, ThemeProvider)
- [Getting started](./GETTING_STARTED.md)
- [Release history](./RELEASES.md) — version changelog (mirrors root `CHANGELOG.md`)
- [Design system overview](./DESIGN_SYSTEM.md)
- [Next.js App Router](./NEXTJS_APP_ROUTER.md) — `ThemeProvider`, RSC entry points, FOUC / `data-kovax-theme` script
