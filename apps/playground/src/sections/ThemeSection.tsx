import React, { useMemo, useRef, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import {
  Button,
  HStack,
  Heading,
  Text,
  ThemeProvider,
  VStack,
  lightPalette,
  themeToken,
  useColorMode,
  useTheme,
  type ColorMode,
} from "kovax-react";
import { LiveExample } from "../components/LiveExample";

const MODE_OPTIONS: ColorMode[] = ["light", "dark", "system"];

function ColorModeDemo() {
  const { colorMode, resolvedColorMode, setColorMode, toggleColorMode } =
    useColorMode();

  return (
    <VStack align="stretch" gap={12}>
      <Text size="sm" color={themeToken("secondary.600")}>
        <Trans
          i18nKey="theme.colorModeDemoDescription"
          components={{ code: <span className="doc-code" /> }}
        />
      </Text>
      <HStack gap={8} wrap="wrap">
        {MODE_OPTIONS.map((m) => (
          <Button
            key={m}
            type="button"
            variant={colorMode === m ? "solid" : "outline"}
            color="primary"
            size="sm"
            onClick={() => setColorMode(m)}
          >
            {m}
          </Button>
        ))}
        <Button type="button" variant="ghost" size="sm" onClick={toggleColorMode}>
          toggle()
        </Button>
      </HStack>
      <HStack gap={16} wrap="wrap">
        <Text size="sm">
          <strong>colorMode:</strong> <span className="doc-code">{colorMode}</span>
        </Text>
        <Text size="sm">
          <strong>resolvedColorMode:</strong>{" "}
          <span className="doc-code">{resolvedColorMode}</span>
        </Text>
      </HStack>
    </VStack>
  );
}

function ScopedThemeDemo() {
  const lightRef = useRef<HTMLDivElement>(null);
  const darkRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const cardStyle: React.CSSProperties = {
    padding: themeToken("spacing.lg"),
    borderRadius: themeToken("borderRadius.lg"),
    border: `1px solid ${themeToken("secondary.200")}`,
    background: themeToken("secondary.50"),
    color: themeToken("secondary.900"),
    flex: "1 1 14rem",
    minWidth: "12rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  };

  return (
    <HStack gap={16} align="stretch" wrap="wrap">
      <ThemeProvider colorMode="light" storageKey={false} target={lightRef}>
        <div ref={lightRef} style={cardStyle}>
          <Heading level={3} size="sm">
            {t("theme.scopedLightTitle")}
          </Heading>
          <Text size="sm" color={themeToken("secondary.700")}>
            {t("theme.scopedLightBody")}
          </Text>
          <div>
            <Button size="sm" color="primary">
              {t("theme.scopedAction")}
            </Button>
          </div>
        </div>
      </ThemeProvider>

      <ThemeProvider colorMode="dark" storageKey={false} target={darkRef}>
        <div ref={darkRef} style={cardStyle}>
          <Heading level={3} size="sm">
            {t("theme.scopedDarkTitle")}
          </Heading>
          <Text size="sm" color={themeToken("secondary.700")}>
            {t("theme.scopedDarkBody")}
          </Text>
          <div>
            <Button size="sm" color="primary">
              {t("theme.scopedAction")}
            </Button>
          </div>
        </div>
      </ThemeProvider>
    </HStack>
  );
}

const BRAND_PALETTE = {
  50: "#f5f3ff",
  100: "#ede9fe",
  200: "#ddd6fe",
  300: "#c4b5fd",
  400: "#a78bfa",
  500: "#7c3aed",
  600: "#6d28d9",
  700: "#5b21b6",
  800: "#4c1d95",
  900: "#3b0a76",
};

function BrandPaletteDemo() {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  const overrides = useMemo(
    () => ({
      light: {
        colors: { ...lightPalette.colors, primary: BRAND_PALETTE },
      },
    }),
    [],
  );

  return (
    <VStack align="stretch" gap={12}>
      <Text size="sm" color={themeToken("secondary.600")}>
        <Trans
          i18nKey="theme.brandDemoDescription"
          components={{ code: <span className="doc-code" /> }}
        />
      </Text>
      <HStack gap={12} wrap="wrap">
        <Button
          type="button"
          size="sm"
          variant={active ? "solid" : "outline"}
          color="primary"
          onClick={() => setActive((v) => !v)}
        >
          {active ? t("theme.brandRevert") : t("theme.brandApply")}
        </Button>
      </HStack>

      {active ? (
        <ThemeProvider
          colorMode="light"
          storageKey={false}
          target={ref}
          palettes={overrides}
        >
          <div
            ref={ref}
            style={{
              padding: themeToken("spacing.lg"),
              borderRadius: themeToken("borderRadius.lg"),
              border: `1px solid ${themeToken("secondary.200")}`,
              background: themeToken("secondary.50"),
            }}
          >
            <HStack gap={12} wrap="wrap">
              <Button color="primary" variant="solid" size="sm">
                Primary
              </Button>
              <Button color="primary" variant="outline" size="sm">
                Outline
              </Button>
              <Button color="primary" variant="ghost" size="sm">
                Ghost
              </Button>
              <Text size="sm" color={themeToken("primary.700")}>
                {t("theme.brandSampleCopy")}
              </Text>
            </HStack>
          </div>
        </ThemeProvider>
      ) : (
        <div
          style={{
            padding: themeToken("spacing.lg"),
            borderRadius: themeToken("borderRadius.lg"),
            border: `1px solid ${themeToken("secondary.200")}`,
            background: themeToken("secondary.50"),
          }}
        >
          <HStack gap={12} wrap="wrap">
            <Button color="primary" variant="solid" size="sm">
              Primary
            </Button>
            <Button color="primary" variant="outline" size="sm">
              Outline
            </Button>
            <Button color="primary" variant="ghost" size="sm">
              Ghost
            </Button>
            <Text size="sm" color={themeToken("primary.700")}>
              {t("theme.brandSampleCopy")}
            </Text>
          </HStack>
        </div>
      )}
    </VStack>
  );
}

function CurrentPaletteSummary() {
  const ctx = useTheme();
  if (!ctx) return null;
  const palette = ctx.palette;
  const swatches: { label: string; value: string }[] = [
    { label: "primary.500", value: palette.colors.primary[500] },
    { label: "secondary.50", value: palette.colors.secondary[50] },
    { label: "secondary.900", value: palette.colors.secondary[900] },
    { label: "success.500", value: palette.colors.success[500] },
    { label: "warning.500", value: palette.colors.warning[500] },
    { label: "error.500", value: palette.colors.error[500] },
  ];

  return (
    <VStack align="stretch" gap={12}>
      <Text size="sm" color={themeToken("secondary.600")}>
        <Trans
          i18nKey="theme.useThemeDescription"
          components={{ code: <span className="doc-code" /> }}
        />
      </Text>
      <HStack gap={12} wrap="wrap">
        {swatches.map((s) => (
          <div
            key={s.label}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              padding: 8,
              borderRadius: 8,
              border: `1px solid ${themeToken("secondary.200")}`,
              background: themeToken("secondary.50"),
              minWidth: "9rem",
            }}
          >
            <div
              style={{
                height: 28,
                borderRadius: 6,
                background: s.value,
                boxShadow: "inset 0 0 0 1px rgb(15 23 42 / 0.05)",
              }}
            />
            <code style={{ fontSize: "0.72rem" }}>{s.label}</code>
            <code style={{ fontSize: "0.7rem", color: themeToken("secondary.600") }}>
              {s.value}
            </code>
          </div>
        ))}
      </HStack>
    </VStack>
  );
}

export function ThemeSection() {
  const { t } = useTranslation();

  return (
    <>
      <h1>{t("theme.pageTitle")}</h1>
      <p>
        <Trans
          i18nKey="theme.intro"
          components={{ code: <span className="doc-code" />, strong: <strong /> }}
        />
      </p>

      <h2>{t("theme.quickStartTitle")}</h2>
      <p>{t("theme.quickStartLead")}</p>
      <LiveExample
        code={`import { ThemeProvider } from "kovax-react";

export function App() {
  return (
    <ThemeProvider defaultColorMode="system">
      {/* every kovax-react component now reads CSS variables emitted by the provider */}
      <Page />
    </ThemeProvider>
  );
}`}
      >
        <div
          style={{
            padding: 16,
            borderRadius: themeToken("borderRadius.md"),
            background: themeToken("secondary.50"),
            border: `1px solid ${themeToken("secondary.200")}`,
          }}
        >
          <Text size="sm" color={themeToken("secondary.700")}>
            <Trans
              i18nKey="theme.quickStartPreview"
              components={{ code: <span className="doc-code" /> }}
            />
          </Text>
        </div>
      </LiveExample>

      <h2>{t("theme.colorModeTitle")}</h2>
      <p>{t("theme.colorModeLead")}</p>
      <LiveExample
        code={`import { Button, HStack, useColorMode } from "kovax-react";

function ColorModeBar() {
  const { colorMode, resolvedColorMode, setColorMode, toggleColorMode } = useColorMode();

  return (
    <HStack gap={8}>
      <Button onClick={() => setColorMode("light")}>Light</Button>
      <Button onClick={() => setColorMode("dark")}>Dark</Button>
      <Button onClick={() => setColorMode("system")}>System</Button>
      <Button variant="ghost" onClick={toggleColorMode}>toggle()</Button>

      <span>colorMode: {colorMode}</span>
      <span>resolvedColorMode: {resolvedColorMode}</span>
    </HStack>
  );
}`}
      >
        <ColorModeDemo />
      </LiveExample>

      <h2>{t("theme.scopedTitle")}</h2>
      <p>{t("theme.scopedLead")}</p>
      <LiveExample
        code={`import { useRef } from "react";
import { Button, ThemeProvider, themeToken } from "kovax-react";

function ScopedDark() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <ThemeProvider colorMode="dark" storageKey={false} target={ref}>
      <div
        ref={ref}
        style={{
          padding: themeToken("spacing.lg"),
          borderRadius: themeToken("borderRadius.lg"),
          background: themeToken("secondary.50"),
          color: themeToken("secondary.900"),
        }}
      >
        Anything inside this ref reads the dark palette,
        siblings outside it stay on the global theme.
        <Button color="primary">Dark island</Button>
      </div>
    </ThemeProvider>
  );
}`}
      >
        <ScopedThemeDemo />
      </LiveExample>

      <h2>{t("theme.brandTitle")}</h2>
      <p>{t("theme.brandLead")}</p>
      <LiveExample
        code={`import { ThemeProvider, lightPalette } from "kovax-react";

const brandPrimary = {
  50: "#f5f3ff",   100: "#ede9fe",  200: "#ddd6fe",
  300: "#c4b5fd",  400: "#a78bfa",  500: "#7c3aed",
  600: "#6d28d9",  700: "#5b21b6",  800: "#4c1d95",  900: "#3b0a76",
};

<ThemeProvider
  palettes={{
    light: {
      colors: { ...lightPalette.colors, primary: brandPrimary },
    },
  }}
>
  <Button color="primary">Brand primary</Button>
</ThemeProvider>`}
      >
        <BrandPaletteDemo />
      </LiveExample>

      <h2>{t("theme.useThemeTitle")}</h2>
      <p>{t("theme.useThemeLead")}</p>
      <LiveExample
        code={`import { useTheme } from "kovax-react";

function Active() {
  const ctx = useTheme();
  if (!ctx) return null;
  const surface = ctx.palette.colors.secondary[50];
  // ctx.colorMode, ctx.resolvedColorMode, ctx.scopeSelector, ctx.palette, ctx.palettes
  return <div style={{ background: surface }}>…</div>;
}`}
      >
        <CurrentPaletteSummary />
      </LiveExample>

      <h2>{t("theme.tokensTitle")}</h2>
      <p>{t("theme.tokensLead")}</p>
      <LiveExample
        code={`import { themeToken } from "kovax-react";

// Anywhere in your own components — values resolve through CSS variables, so
// ThemeProvider mode flips are instant and SSR-safe.
const styles = {
  background: themeToken("secondary.50"),
  color: themeToken("secondary.900"),
  padding: themeToken("spacing.lg"),
  borderRadius: themeToken("borderRadius.md"),
  boxShadow: themeToken("shadow.md"),
  transition: \`background \${themeToken("duration.fast")} \${themeToken("easing.standard")}\`,
};

// Equivalent in plain CSS — the provider emits the variables for you:
// background: var(--kx-color-secondary-50);
// color: var(--kx-color-secondary-900);
// padding: var(--kx-spacing-lg);`}
      >
        <div
          style={{
            padding: 20,
            borderRadius: themeToken("borderRadius.md"),
            background: themeToken("secondary.50"),
            color: themeToken("secondary.900"),
            border: `1px solid ${themeToken("secondary.200")}`,
            boxShadow: themeToken("shadow.md"),
            transition: `background ${themeToken("duration.fast")} ${themeToken(
              "easing.standard",
            )}`,
          }}
        >
          <Text size="sm">
            <Trans
              i18nKey="theme.tokensPreview"
              components={{ code: <span className="doc-code" /> }}
            />
          </Text>
        </div>
      </LiveExample>

      <h2>{t("theme.ssrTitle")}</h2>
      <p>
        <Trans
          i18nKey="theme.ssrLead"
          components={{ code: <span className="doc-code" />, strong: <strong /> }}
        />
      </p>
      <LiveExample
        code={`// Next.js App Router (app/layout.tsx)
import { ThemeProvider } from "kovax-react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* defaultColorMode="light" prevents a flash before hydration. */}
        <ThemeProvider defaultColorMode="light" nonce={cspNonce()}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}`}
      >
        <div
          style={{
            padding: 16,
            borderRadius: themeToken("borderRadius.md"),
            background: themeToken("secondary.50"),
            border: `1px solid ${themeToken("secondary.200")}`,
          }}
        >
          <Text size="sm" color={themeToken("secondary.700")}>
            <Trans
              i18nKey="theme.ssrPreview"
              components={{ code: <span className="doc-code" />, strong: <strong /> }}
            />
          </Text>
        </div>
      </LiveExample>

      <h2>{t("theme.propsTitle")}</h2>
      <div className="tokens-table-scroll">
        <table className="tokens-table">
          <thead>
            <tr>
              <th>{t("theme.thProp")}</th>
              <th>{t("theme.thType")}</th>
              <th>{t("theme.thDescription")}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>colorMode</code>
              </td>
              <td>
                <code>"light" | "dark" | "system"</code>
              </td>
              <td>{t("theme.propColorMode")}</td>
            </tr>
            <tr>
              <td>
                <code>defaultColorMode</code>
              </td>
              <td>
                <code>"light" | "dark" | "system"</code>
              </td>
              <td>{t("theme.propDefaultColorMode")}</td>
            </tr>
            <tr>
              <td>
                <code>onColorModeChange</code>
              </td>
              <td>
                <code>(mode, resolved) =&gt; void</code>
              </td>
              <td>{t("theme.propOnChange")}</td>
            </tr>
            <tr>
              <td>
                <code>storageKey</code>
              </td>
              <td>
                <code>string | false | null</code>
              </td>
              <td>{t("theme.propStorageKey")}</td>
            </tr>
            <tr>
              <td>
                <code>palettes</code>
              </td>
              <td>
                <code>{`{ light?: Partial<ThemePalette>; dark?: Partial<ThemePalette> }`}</code>
              </td>
              <td>{t("theme.propPalettes")}</td>
            </tr>
            <tr>
              <td>
                <code>target</code>
              </td>
              <td>
                <code>{`"documentElement" | RefObject<HTMLElement>`}</code>
              </td>
              <td>{t("theme.propTarget")}</td>
            </tr>
            <tr>
              <td>
                <code>nonce</code>
              </td>
              <td>
                <code>string</code>
              </td>
              <td>{t("theme.propNonce")}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
