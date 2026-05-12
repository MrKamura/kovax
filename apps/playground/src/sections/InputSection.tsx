import React, { useState } from "react";
import { Box, Heading, Input, InputGroup, Text, themeToken, VStack } from "kovax-react";
import { Trans, useTranslation } from "react-i18next";
import { MdSearch } from "react-icons/md";
import { LiveExample } from "../components/LiveExample";

function ControlledPhoneDemo() {
  const [phone, setPhone] = useState("");
  return (
    <VStack align="stretch" gap={8}>
      <Input
        mask="+7 (999) 999-99-99"
        placeholder="+7 (___) ___-__-__"
        colorScheme="primary"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        aria-label="Phone number"
      />
      <Text size="xs" color={themeToken("secondary.600")}>
        Controlled: mask filters digits; value syncs with React state.
      </Text>
      <Text size="sm" color={themeToken("secondary.800")}>
        {phone ? `Stored: ${phone}` : "Stored: (empty)"}
      </Text>
    </VStack>
  );
}

function ControlledCardDemo() {
  const [card, setCard] = useState("");
  return (
    <VStack align="stretch" gap={8}>
      <Input
        mask="9999 9999 9999 9999"
        placeholder="0000 0000 0000 0000"
        colorScheme="secondary"
        inputMode="numeric"
        autoComplete="cc-number"
        value={card}
        onChange={(e) => setCard(e.target.value)}
        aria-label="Card number"
      />
      <Text size="xs" color={themeToken("secondary.600")}>
        Groups of four digits; spaces come from the mask pattern.
      </Text>
    </VStack>
  );
}

function ClearAndCounterDemo() {
  const [query, setQuery] = useState("kovax");
  const [bio, setBio] = useState("Short bio.");
  return (
    <VStack align="stretch" gap={16} maxW={440}>
      <Input
        clearable
        clearAriaLabel="Clear search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search with clear…"
        aria-label="Search with clear"
      />
      <Input
        showCharacterCount
        maxLength={80}
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="Bio (max 80 chars)"
        aria-label="Biography"
      />
    </VStack>
  );
}

function FloatingLabelDemo() {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("Kovax");
  return (
    <VStack align="stretch" gap={16} maxW={440}>
      <Input
        floatingLabel
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
      />
      <Input floatingLabel variant="outline" placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} />
      <Input floatingLabel variant="filled" size="sm" placeholder="Small floating label" />
    </VStack>
  );
}

export function InputSection() {
  const { t } = useTranslation();
  return (
    <>
      <h1>Input</h1>
      <p>
        <Trans
          i18nKey="input.intro"
          components={{ strong: <strong /> }}
        />
      </p>

      <h2>{t("input.examplesBasics")}</h2>
      <LiveExample
        code={`import { Heading, Input, Text, themeToken, VStack } from "kovax-react";

<VStack align="stretch" gap={16} maxW={360}>
  <VStack align="stretch" gap={4}>
    <Heading level={5}>Field demo</Heading>
    <Text size="sm" color={themeToken("secondary.600")}>
      colorScheme and size come from library presets; pair with Typography for labels.
    </Text>
  </VStack>
  <Input placeholder="Primary md" colorScheme="primary" />
  <Input placeholder="Secondary sm" size="sm" colorScheme="secondary" />
  <Input placeholder="Invalid" isInvalid aria-invalid />
  <Input placeholder="Disabled" isDisabled />
</VStack>`}
      >
        <VStack align="stretch" gap={16} maxW={360}>
          <VStack align="stretch" gap={4}>
            <Heading level={5}>Field demo</Heading>
            <Text size="sm" color={themeToken("secondary.600")}>
              colorScheme and size come from library presets; pair with Typography for labels.
            </Text>
          </VStack>
          <Input placeholder="Primary md" colorScheme="primary" />
          <Input placeholder="Secondary sm" size="sm" colorScheme="secondary" />
          <Input placeholder="Invalid" isInvalid aria-invalid />
          <Input placeholder="Disabled" isDisabled />
        </VStack>
      </LiveExample>

      <h2>{t("input.examplesVariantGroup")}</h2>
      <LiveExample
        code={`import { Heading, Input, Text, themeToken, VStack } from "kovax-react";

<VStack align="stretch" gap={12} maxW={420}>
  <Text size="sm" color={themeToken("secondary.600")}>
    variant=&quot;default&quot; keeps a light shadow; &quot;outline&quot; is flat and transparent; &quot;filled&quot; adds a soft surface tint.
  </Text>
  <Input variant="default" placeholder="default · md" />
  <Input variant="outline" placeholder="outline" />
  <Input variant="filled" placeholder="filled" />
</VStack>`}
      >
        <VStack align="stretch" gap={12} maxW={420}>
          <Heading level={5}>Variants</Heading>
          <Text size="sm" color={themeToken("secondary.600")}>
            default keeps elevation; outline is flat and transparent; filled uses a soft tint.
          </Text>
          <Input variant="default" placeholder="default · md" />
          <Input variant="outline" placeholder="outline" />
          <Input variant="filled" placeholder="filled" />
        </VStack>
      </LiveExample>

      <LiveExample
        code={`import { Input, InputGroup, Text, themeToken, VStack } from "kovax-react";
import { MdSearch } from "react-icons/md";

<VStack align="stretch" gap={12} maxW={440}>
  <Text size="sm" color={themeToken("secondary.600")}>
    InputGroup shares border/focus; use leftAddon for an icon (decorate icons with aria-hidden).
    Pass isInvalid on the group when the inner field errors so the outer border turns red too.
  </Text>
  <InputGroup leftAddon={<MdSearch aria-hidden size={18} />} colorScheme="primary">
    <Input variant="outline" placeholder="Search…" aria-label="Search" />
  </InputGroup>
  <InputGroup leftAddon={<MdSearch aria-hidden size={18} />} colorScheme="primary" isInvalid>
    <Input variant="outline" isInvalid errorMessage="Try another query." placeholder="Invalid group" aria-label="Search invalid" />
  </InputGroup>
</VStack>`}
      >
        <VStack align="stretch" gap={12} maxW={440}>
          <Heading level={5}>InputGroup</Heading>
          <Text size="sm" color={themeToken("secondary.600")}>
            Shared chrome and focus ring; pass <code>isInvalid</code> on the group when the inner field is in error so the outer border matches.
          </Text>
          <InputGroup leftAddon={<MdSearch aria-hidden size={18} />} colorScheme="primary">
            <Input variant="outline" placeholder="Search…" aria-label="Search" />
          </InputGroup>
          <InputGroup leftAddon={<MdSearch aria-hidden size={18} />} colorScheme="primary" isInvalid>
            <Input
              variant="outline"
              isInvalid
              errorMessage="Try another query."
              placeholder="Invalid group"
              aria-label="Search invalid demo"
            />
          </InputGroup>
        </VStack>
      </LiveExample>

      <h2>{t("input.examplesSizesColors")}</h2>
      <LiveExample
        code={`import { Input, Text, themeToken, VStack } from "kovax-react";

<VStack align="stretch" gap={12} maxW={400}>
  <Text size="sm" color={themeToken("secondary.600")}>
    Sizes sm / md / lg and colorScheme accents on focus ring color (border uses palette 500).
  </Text>
  <Input size="sm" colorScheme="success" placeholder="Small · success" />
  <Input size="md" colorScheme="warning" placeholder="Medium · warning" />
  <Input size="lg" colorScheme="error" placeholder="Large · error" />
</VStack>`}
      >
        <VStack align="stretch" gap={12} maxW={400}>
          <Text size="sm" color={themeToken("secondary.600")}>
            Sizes sm / md / lg and colorScheme accents on focus ring color (border uses palette 500).
          </Text>
          <Input size="sm" colorScheme="success" placeholder="Small · success" />
          <Input size="md" colorScheme="warning" placeholder="Medium · warning" />
          <Input size="lg" colorScheme="error" placeholder="Large · error" />
        </VStack>
      </LiveExample>

      <h2>{t("input.examplesStatesValidation")}</h2>
      <LiveExample
        code={`import { Input, Text, themeToken, VStack } from "kovax-react";

<VStack align="stretch" gap={12} maxW={400}>
  <Text size="sm" color={themeToken("secondary.600")}>
    isRequired maps to required + aria-required; errorMessage renders below and sets aria-describedby.
  </Text>
  <Input placeholder="Read-only snapshot" isReadOnly defaultValue="Cannot edit" />
  <Input placeholder="Required field" isRequired aria-label="Required demo" />
  <Input
    placeholder="Email with validation"
    type="email"
    isInvalid
    errorMessage="Enter a valid email address."
    defaultValue="not-an-email"
    aria-label="Email validation demo"
  />
</VStack>`}
      >
        <VStack align="stretch" gap={12} maxW={400}>
          <Text size="sm" color={themeToken("secondary.600")}>
            isRequired maps to required + aria-required; errorMessage renders below and sets aria-describedby.
          </Text>
          <Input placeholder="Read-only snapshot" isReadOnly defaultValue="Cannot edit" />
          <Input placeholder="Required field" isRequired aria-label="Required demo" />
          <Input
            placeholder="Email with validation"
            type="email"
            isInvalid
            errorMessage="Enter a valid email address."
            defaultValue="not-an-email"
            aria-label="Email validation demo"
          />
        </VStack>
      </LiveExample>

      <h2>{t("input.examplesNativeTypes")}</h2>
      <LiveExample
        code={`import { Input, Text, themeToken, VStack } from "kovax-react";

<VStack align="stretch" gap={12} maxW={400}>
  <Text size="sm" color={themeToken("secondary.600")}>
    Native type and attributes pass through (password, number, search, maxLength, autoComplete, etc.).
  </Text>
  <Input type="password" placeholder="Password" autoComplete="current-password" aria-label="Password" />
  <Input type="number" placeholder="Amount" min={0} step={0.01} aria-label="Amount" />
  <Input type="search" placeholder="Search…" maxLength={120} aria-label="Search" />
</VStack>`}
      >
        <VStack align="stretch" gap={12} maxW={400}>
          <Text size="sm" color={themeToken("secondary.600")}>
            Native type and attributes pass through (password, number, search, maxLength, autoComplete, etc.).
          </Text>
          <Input type="password" placeholder="Password" autoComplete="current-password" aria-label="Password" />
          <Input type="number" placeholder="Amount" min={0} step={0.01} aria-label="Amount" />
          <Input type="search" placeholder="Search…" maxLength={120} aria-label="Search" />
        </VStack>
      </LiveExample>

      <h2>{t("input.examplesClearCounter")}</h2>
      <LiveExample
        code={`import { useState } from "react";
import { Input, Text, themeToken, VStack } from "kovax-react";

function Demo() {
  const [query, setQuery] = useState("kovax");
  const [bio, setBio] = useState("Short bio.");
  return (
    <VStack align="stretch" gap={16} maxW={440}>
      <Text size="sm" color={themeToken("secondary.600")}>
        clearable adds a trailing button (controlled fields should forward empty strings via onChange). showCharacterCount pairs with maxLength and merges into aria-describedby.
      </Text>
      <Input clearable clearAriaLabel="Clear search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search…" aria-label="Search" />
      <Input showCharacterCount maxLength={80} value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Bio" aria-label="Bio" />
    </VStack>
  );
}

<Demo />`}
      >
        <VStack align="stretch" gap={12} maxW={440}>
          <Text size="sm" color={themeToken("secondary.600")}>
            Clear uses <code>data-testid=&quot;kv-input-clear&quot;</code>; localize via{" "}
            <code>clearAriaLabel</code>. Counter reads displayed length (after mask processing).
          </Text>
          <ClearAndCounterDemo />
        </VStack>
      </LiveExample>

      <h2>{t("input.examplesFloatingLabel")}</h2>
      <LiveExample
        code={`import { useState } from "react";
import { Input, Text, themeToken, VStack } from "kovax-react";

function Demo() {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("Kovax");
  return (
    <VStack align="stretch" gap={16} maxW={440}>
      <Text size="sm" color={themeToken("secondary.600")}>
        floatingLabel turns placeholder into a caption that rests in the field, then slides to the top edge with easing when focused or filled.
      </Text>
      <Input floatingLabel type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
      <Input floatingLabel variant="outline" placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} />
      <Input floatingLabel variant="filled" size="sm" placeholder="Small floating label" />
    </VStack>
  );
}

<Demo />`}
      >
        <VStack align="stretch" gap={12} maxW={440}>
          <Text size="sm" color={themeToken("secondary.600")}>
            The native placeholder is hidden; an associated label (<code>htmlFor</code>) carries the same text for screen readers.
          </Text>
          <FloatingLabelDemo />
        </VStack>
      </LiveExample>

      <h2>{t("input.examplesMaskComposition")}</h2>
      <LiveExample
        code={`import { useState } from "react";
import { Box, Input, Text, themeToken, VStack } from "kovax-react";

function PhoneField() {
  const [phone, setPhone] = useState("");
  return (
    <Input
      mask="+7 (999) 999-99-99"
      placeholder="+7 (___) ___-__-__"
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
      aria-label="Phone number"
    />
  );
}

<Box p={16} borderRadius={themeToken("borderRadius.md")} boxShadow={themeToken("shadow.sm")} maxW={420}>
  <VStack align="stretch" gap={16}>
    <Text size="sm" color={themeToken("secondary.600")}>
      Built-in mask (no extra deps). Compose inside Box for card-style layouts.
    </Text>
    <PhoneField />
    <Input mask="9999 9999 9999 9999" placeholder="Card" inputMode="numeric" aria-label="Card number" />
  </VStack>
</Box>`}
      >
        <Box
          p={16}
          borderRadius={themeToken("borderRadius.md")}
          boxShadow={themeToken("shadow.sm")}
          maxW={420}
        >
          <VStack align="stretch" gap={16}>
            <Text size="sm" color={themeToken("secondary.600")}>
              Built-in mask (no extra deps). Compose inside Box for card-style layouts.
            </Text>
            <ControlledPhoneDemo />
            <ControlledCardDemo />
          </VStack>
        </Box>
      </LiveExample>
    </>
  );
}
