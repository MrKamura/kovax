import { Trans, useTranslation } from "react-i18next";
import {
  breakpoints,
  colors,
  fontWeights,
  HStack,
  Heading,
  letterSpacings,
  lineHeights,
  motion,
  shadows,
  sizes,
  Text,
  themeToken,
  transitions,
  VStack,
  zIndices,
} from "kovax-react";
import type {
  BorderRadiusKey,
  BreakpointKey,
  ColorName,
  ColorShade,
  DurationKey,
  EasingKey,
  FontWeightKey,
  LetterSpacingKey,
  LineHeightKey,
  ShadowKey,
  SizeKey,
  TextSizeKey,
  TransitionKey,
  ZIndexKey,
} from "kovax-react";

type CssVars = { [key: `--${string}`]: string | number };

const PALETTE_NAMES = Object.keys(colors) as ColorName[];
const SHADE_KEYS = [
  50, 100, 200, 300, 400, 500, 600, 700, 800, 900,
] as const satisfies readonly ColorShade[];

function isLightShade(shade: ColorShade): boolean {
  return Number(shade) <= 400;
}

function ColorSwatch({
  palette,
  shade,
}: {
  palette: ColorName;
  shade: ColorShade;
}) {
  const hex = colors[palette][shade];
  return (
    <li className="tokens-color-swatch">
      <div
        className="tokens-color-swatch-fill"
        style={{ background: hex }}
        data-light={isLightShade(shade)}
      >
        <span className="tokens-color-swatch-shade">{shade}</span>
      </div>
      <code className="tokens-color-swatch-hex">{hex}</code>
    </li>
  );
}

function ColorPalette({ palette }: { palette: ColorName }) {
  return (
    <article className="tokens-color-palette">
      <header className="tokens-color-palette-head">
        <h3>{palette}</h3>
        <code>colors.{palette}</code>
      </header>
      <ul className="tokens-color-grid">
        {SHADE_KEYS.map((shade) => (
          <ColorSwatch key={shade} palette={palette} shade={shade} />
        ))}
      </ul>
    </article>
  );
}

function SpacingRow({ keyName }: { keyName: SizeKey }) {
  const value = sizes.spacing[keyName];
  return (
    <li className="tokens-scale-row">
      <code className="tokens-scale-key">spacing.{keyName}</code>
      <span className="tokens-scale-bar" style={{ width: value }} />
      <code className="tokens-scale-value">{value}</code>
    </li>
  );
}

function RadiusCard({ keyName }: { keyName: BorderRadiusKey }) {
  const value = sizes.borderRadius[keyName];
  return (
    <li className="tokens-radius-card">
      <div className="tokens-radius-preview" style={{ borderRadius: value }} />
      <code>borderRadius.{keyName}</code>
      <code className="tokens-scale-value">{value}</code>
    </li>
  );
}

function ShadowCard({ keyName }: { keyName: ShadowKey }) {
  const value = shadows[keyName];
  return (
    <li className="tokens-shadow-card">
      <div className="tokens-shadow-preview" style={{ boxShadow: value }} />
      <code>shadow.{keyName}</code>
      <code className="tokens-scale-value tokens-scale-value--break">
        {value}
      </code>
    </li>
  );
}

function TextScaleRow({ keyName }: { keyName: TextSizeKey }) {
  const value = sizes.text[keyName];
  return (
    <li className="tokens-text-row">
      <code className="tokens-scale-key">text.{keyName}</code>
      <p className="tokens-text-sample" style={{ fontSize: value }}>
        The quick brown fox
      </p>
      <code className="tokens-scale-value">{value}</code>
    </li>
  );
}

function FontWeightRow({ keyName }: { keyName: FontWeightKey }) {
  const value = fontWeights[keyName];
  return (
    <li className="tokens-text-row">
      <code className="tokens-scale-key">fontWeight.{keyName}</code>
      <p className="tokens-text-sample" style={{ fontWeight: value }}>
        Aa Bb Cc 123
      </p>
      <code className="tokens-scale-value">{value}</code>
    </li>
  );
}

function LineHeightRow({ keyName }: { keyName: LineHeightKey }) {
  const value = lineHeights[keyName];
  return (
    <li className="tokens-block-row">
      <code className="tokens-scale-key">lineHeight.{keyName}</code>
      <p
        className="tokens-text-paragraph"
        style={{ lineHeight: value }}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae
        velit fringilla, dictum lorem at, sollicitudin lectus.
      </p>
      <code className="tokens-scale-value">{value}</code>
    </li>
  );
}

function LetterSpacingRow({ keyName }: { keyName: LetterSpacingKey }) {
  const value = letterSpacings[keyName];
  return (
    <li className="tokens-text-row">
      <code className="tokens-scale-key">letterSpacing.{keyName}</code>
      <p className="tokens-text-sample" style={{ letterSpacing: value }}>
        KOVAX REACT
      </p>
      <code className="tokens-scale-value">{value}</code>
    </li>
  );
}

function MotionRow({
  durationKey,
  easingKey,
  index,
}: {
  durationKey: DurationKey;
  easingKey: EasingKey;
  index: number;
}) {
  const dur = motion.duration[durationKey];
  const eas = motion.easing[easingKey];
  const style: CssVars = {
    "--demo-duration": dur,
    "--demo-easing": eas,
    "--demo-delay": `${index * 80}ms`,
  };
  return (
    <li className="tokens-motion-row">
      <code className="tokens-scale-key">
        duration.{durationKey} · easing.{easingKey}
      </code>
      <div className="tokens-motion-track" style={style}>
        <span className="tokens-motion-dot" />
      </div>
      <code className="tokens-scale-value">
        {dur} · {eas}
      </code>
    </li>
  );
}

const SHADOW_ORDER: readonly ShadowKey[] = [
  "none",
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
  "inner",
  "focusRing",
];

const RADIUS_ORDER: readonly BorderRadiusKey[] = [
  "none",
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
  "3xl",
  "full",
];

const SPACING_ORDER: readonly SizeKey[] = [
  "none",
  "2xs",
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
  "3xl",
  "4xl",
  "5xl",
];

const TEXT_ORDER: readonly TextSizeKey[] = [
  "xs",
  "sm",
  "base",
  "lg",
  "xl",
  "2xl",
  "3xl",
  "4xl",
  "5xl",
];

const FONT_WEIGHT_ORDER = Object.keys(
  fontWeights,
) as readonly FontWeightKey[];

const LINE_HEIGHT_ORDER = Object.keys(
  lineHeights,
) as readonly LineHeightKey[];

const LETTER_SPACING_ORDER = Object.keys(
  letterSpacings,
) as readonly LetterSpacingKey[];

const Z_INDEX_ORDER = (Object.keys(zIndices) as readonly ZIndexKey[]).slice().sort(
  (a, b) => zIndices[a] - zIndices[b],
);

const BREAKPOINT_ORDER = Object.keys(
  breakpoints,
) as readonly BreakpointKey[];

const TRANSITION_ORDER = Object.keys(
  transitions,
) as readonly TransitionKey[];

const DURATION_ORDER = Object.keys(
  motion.duration,
) as readonly DurationKey[];

const EASING_ORDER = Object.keys(
  motion.easing,
) as readonly EasingKey[];

export function TokensSection() {
  const { t } = useTranslation();

  return (
    <>
      <h1>{t("tokens.pageTitle")}</h1>
      <p>
        <Trans
          i18nKey="tokens.intro"
          components={{ code: <span className="doc-code" />, strong: <strong /> }}
        />
      </p>

      <section
        className="tokens-block"
        aria-labelledby="tokens-colors-heading"
      >
        <Heading level={2} id="tokens-colors-heading">
          {t("tokens.colorsTitle")}
        </Heading>
        <p className="tokens-block-lead">{t("tokens.colorsLead")}</p>
        <VStack align="stretch" gap={24}>
          {PALETTE_NAMES.map((palette) => (
            <ColorPalette key={palette} palette={palette} />
          ))}

          <article className="tokens-color-palette">
            <header className="tokens-color-palette-head">
              <h3>{t("tokens.baseColors")}</h3>
              <code>baseColors</code>
            </header>
            <HStack gap={12} wrap="wrap">
              <div className="tokens-base-swatch tokens-base-swatch--white">
                <code>white</code>
                <code>#ffffff</code>
              </div>
              <div className="tokens-base-swatch tokens-base-swatch--black">
                <code>black</code>
                <code>#000000</code>
              </div>
            </HStack>
          </article>
        </VStack>
      </section>

      <section
        className="tokens-block"
        aria-labelledby="tokens-typography-heading"
      >
        <Heading level={2} id="tokens-typography-heading">
          {t("tokens.typographyTitle")}
        </Heading>
        <p className="tokens-block-lead">{t("tokens.typographyLead")}</p>

        <Heading level={3} size="sm">
          {t("tokens.fontSize")}
        </Heading>
        <ul className="tokens-scale-list">
          {TEXT_ORDER.map((key) => (
            <TextScaleRow key={key} keyName={key} />
          ))}
        </ul>

        <Heading level={3} size="sm">
          {t("tokens.fontWeight")}
        </Heading>
        <ul className="tokens-scale-list">
          {FONT_WEIGHT_ORDER.map((key) => (
            <FontWeightRow key={key} keyName={key} />
          ))}
        </ul>

        <Heading level={3} size="sm">
          {t("tokens.lineHeight")}
        </Heading>
        <ul className="tokens-scale-list tokens-scale-list--blocks">
          {LINE_HEIGHT_ORDER.map((key) => (
            <LineHeightRow key={key} keyName={key} />
          ))}
        </ul>

        <Heading level={3} size="sm">
          {t("tokens.letterSpacing")}
        </Heading>
        <ul className="tokens-scale-list">
          {LETTER_SPACING_ORDER.map((key) => (
            <LetterSpacingRow key={key} keyName={key} />
          ))}
        </ul>
      </section>

      <section
        className="tokens-block"
        aria-labelledby="tokens-spacing-heading"
      >
        <Heading level={2} id="tokens-spacing-heading">
          {t("tokens.spacingTitle")}
        </Heading>
        <p className="tokens-block-lead">{t("tokens.spacingLead")}</p>
        <ul className="tokens-scale-list">
          {SPACING_ORDER.map((key) => (
            <SpacingRow key={key} keyName={key} />
          ))}
        </ul>
      </section>

      <section
        className="tokens-block"
        aria-labelledby="tokens-radius-heading"
      >
        <Heading level={2} id="tokens-radius-heading">
          {t("tokens.radiusTitle")}
        </Heading>
        <p className="tokens-block-lead">{t("tokens.radiusLead")}</p>
        <ul className="tokens-radius-grid">
          {RADIUS_ORDER.map((key) => (
            <RadiusCard key={key} keyName={key} />
          ))}
        </ul>
      </section>

      <section
        className="tokens-block"
        aria-labelledby="tokens-shadow-heading"
      >
        <Heading level={2} id="tokens-shadow-heading">
          {t("tokens.shadowTitle")}
        </Heading>
        <p className="tokens-block-lead">{t("tokens.shadowLead")}</p>
        <ul className="tokens-shadow-grid">
          {SHADOW_ORDER.map((key) => (
            <ShadowCard key={key} keyName={key} />
          ))}
        </ul>
      </section>

      <section
        className="tokens-block"
        aria-labelledby="tokens-motion-heading"
      >
        <Heading level={2} id="tokens-motion-heading">
          {t("tokens.motionTitle")}
        </Heading>
        <p className="tokens-block-lead">{t("tokens.motionLead")}</p>

        <Heading level={3} size="sm">
          {t("tokens.duration")}
        </Heading>
        <ul className="tokens-scale-list">
          {DURATION_ORDER.map((key, i) => (
            <MotionRow
              key={key}
              durationKey={key}
              easingKey="standard"
              index={i}
            />
          ))}
        </ul>

        <Heading level={3} size="sm">
          {t("tokens.easing")}
        </Heading>
        <ul className="tokens-scale-list">
          {EASING_ORDER.map((key, i) => (
            <MotionRow
              key={key}
              durationKey="slow"
              easingKey={key}
              index={i}
            />
          ))}
        </ul>

        <Heading level={3} size="sm">
          {t("tokens.transitionsLegacy")}
        </Heading>
        <ul className="tokens-scale-list">
          {TRANSITION_ORDER.map((key) => (
            <li key={key} className="tokens-scale-row">
              <code className="tokens-scale-key">transition.{key}</code>
              <code className="tokens-scale-value tokens-scale-value--break">
                {transitions[key]}
              </code>
            </li>
          ))}
        </ul>
      </section>

      <section
        className="tokens-block"
        aria-labelledby="tokens-zindex-heading"
      >
        <Heading level={2} id="tokens-zindex-heading">
          {t("tokens.zIndexTitle")}
        </Heading>
        <p className="tokens-block-lead">{t("tokens.zIndexLead")}</p>
        <div className="tokens-table-scroll">
          <table className="tokens-table">
            <thead>
              <tr>
                <th>{t("tokens.thKey")}</th>
                <th>{t("tokens.thValue")}</th>
                <th>{t("tokens.thUsage")}</th>
              </tr>
            </thead>
            <tbody>
              {Z_INDEX_ORDER.map((key) => (
                <tr key={key}>
                  <td>
                    <code>zIndex.{key}</code>
                  </td>
                  <td>
                    <code>{zIndices[key]}</code>
                  </td>
                  <td>{t(`tokens.zIndexHints.${key}`, { defaultValue: "" })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section
        className="tokens-block"
        aria-labelledby="tokens-breakpoints-heading"
      >
        <Heading level={2} id="tokens-breakpoints-heading">
          {t("tokens.breakpointsTitle")}
        </Heading>
        <p className="tokens-block-lead">{t("tokens.breakpointsLead")}</p>
        <div className="tokens-table-scroll">
          <table className="tokens-table">
            <thead>
              <tr>
                <th>{t("tokens.thKey")}</th>
                <th>{t("tokens.thValue")}</th>
                <th>{t("tokens.thHint")}</th>
              </tr>
            </thead>
            <tbody>
              {BREAKPOINT_ORDER.map((key) => (
                <tr key={key}>
                  <td>
                    <code>breakpoint.{key}</code>
                  </td>
                  <td>
                    <code>{breakpoints[key]}</code>
                  </td>
                  <td>
                    <Text size="sm" color={themeToken("secondary.700")}>
                      @media (min-width: {breakpoints[key]})
                    </Text>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
