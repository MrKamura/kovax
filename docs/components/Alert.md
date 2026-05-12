# Alert

Inline **status / banner** block for page-level or section-level messages — distinct from **`Toast`** (ephemeral snackbars) and **`FormError`** (field validation beside controls).

## Import

```tsx
import { Alert } from "kovax-react";
// Optional bundle:
import { Alert } from "kovax-react/alert";
```

## Usage

Neutral banner:

```tsx
<Alert>Your draft was saved locally.</Alert>
```

With tone and heading:

```tsx
<Alert tone="warning" heading="Maintenance tonight">
  APIs may respond slowly between 02:00–03:00 UTC.
</Alert>
```

Assertive alert (interrupts assistive tech — use sparingly):

```tsx
<Alert tone="error" heading="Payment failed" assertive>
  Your card was declined. Try another method.
</Alert>
```

Dismissible (wire `onDismiss` yourself):

```tsx
const [open, setOpen] = useState(true);

{open ?
  <Alert tone="info" heading="Cookie notice" onDismiss={() => setOpen(false)}>
    We use cookies to improve your experience.
  </Alert>
: null}
```

Hide or replace the leading icon:

```tsx
<Alert tone="success" icon={null}>No leading glyph.</Alert>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `tone` | `"info"` \| `"success"` \| `"warning"` \| `"error"` \| `"neutral"` | `"neutral"` | Palette for surface, border, text, and default icon |
| `heading` | `ReactNode` | — | Bold title row (`aria-labelledby` target); avoids shadowing the HTML `title` tooltip attribute |
| `assertive` | `boolean` | `false` | `false`: `role="status"` + `aria-live="polite"`. `true`: `role="alert"` + `aria-live="assertive"` |
| `onDismiss` | `() => void` | — | Shows a dismiss control when provided |
| `dismissLabel` | `string` | `"Dismiss"` | Accessible name for the dismiss control |
| `icon` | `ReactNode` \| `null` \| `false` | default per tone | Custom icon; `null` / `false` hides |
| … | `HTMLAttributes<HTMLDivElement>` | — | Root container (`data-alert-tone`) |

## Notes

- Prefer **`assertive={false}`** for non-blocking inline banners; reserve **`assertive`** for urgent, synchronous errors.
- **Playground**: **Components → Alert**.
