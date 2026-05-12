import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormError,
  FormGroup,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  Text,
  themeToken,
  VStack,
} from "kovax-react";
import { Controller, useForm } from "react-hook-form";
import { Trans, useTranslation } from "react-i18next";
import { LiveExample } from "../components/LiveExample";

function ContactFormWithButtonsDemo() {
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(`Submitted (demo): ${email || "(no email)"}`);
  };

  const handleReset = () => {
    setEmail("");
    setNote("");
    setStatus(null);
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      maxW={440}
      w="100%"
      p={themeToken("spacing.md")}
      borderRadius={themeToken("borderRadius.md")}
      border={`1px solid ${themeToken("secondary.200")}`}
      boxShadow={themeToken("shadow.sm")}
    >
      <VStack align="stretch" gap={themeToken("spacing.md")}>
        <Heading level={5}>Quick message</Heading>
        <FormControl isRequired>
          <FormLabel htmlFor="pg-contact-email">Email</FormLabel>
          <Input
            id="pg-contact-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
          <FormHelperText>We&apos;ll only use this to reply.</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="pg-contact-note">Note</FormLabel>
          <Input
            id="pg-contact-note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Optional details"
          />
        </FormControl>
        <HStack gap={themeToken("spacing.sm")} wrap="wrap">
          <Button type="submit">Send</Button>
          <Button type="button" variant="outline" color="secondary" onClick={handleReset}>
            Reset
          </Button>
        </HStack>
        {status ?
          <Text size="sm" color={themeToken("secondary.700")}>
            {status}
          </Text>
        : null}
      </VStack>
    </Box>
  );
}

type RhfDemoValues = {
  email: string;
  password: string;
};

function ReactHookFormDemo() {
  const { control, handleSubmit, formState, reset } = useForm<RhfDemoValues>({
    defaultValues: { email: "", password: "" },
    mode: "onBlur",
  });

  const [payload, setPayload] = useState<string | null>(null);

  const { errors } = formState;

  return (
    <Box
      as="form"
      onSubmit={handleSubmit((data) => setPayload(JSON.stringify(data)))}
      maxW={440}
      w="100%"
    >
      <VStack align="stretch" gap={themeToken("spacing.md")}>
        <FormControl isInvalid={Boolean(errors.email)}>
          <FormLabel htmlFor="pg-rhf-email">Email</FormLabel>
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            }}
            render={({ field }) => (
              <Input
                {...field}
                id="pg-rhf-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
              />
            )}
          />
          {errors.email ?
            <FormError>{errors.email.message}</FormError>
          : (
            <FormHelperText>Use any valid-looking email for the demo.</FormHelperText>
          )}
        </FormControl>

        <FormControl isInvalid={Boolean(errors.password)}>
          <FormLabel htmlFor="pg-rhf-password">Password</FormLabel>
          <Controller
            name="password"
            control={control}
            rules={{
              required: "Password is required",
              minLength: { value: 8, message: "Use at least 8 characters" },
            }}
            render={({ field }) => (
              <Input
                {...field}
                id="pg-rhf-password"
                type="password"
                autoComplete="new-password"
                placeholder="••••••••"
              />
            )}
          />
          <FormHelperText>Minimum 8 characters.</FormHelperText>
          {errors.password ?
            <FormError>{errors.password.message}</FormError>
          : null}
        </FormControl>

        <HStack gap={themeToken("spacing.sm")} wrap="wrap">
          <Button type="submit">Sign up (demo)</Button>
          <Button
            type="button"
            variant="outline"
            color="secondary"
            onClick={() => {
              reset();
              setPayload(null);
            }}
          >
            Clear form
          </Button>
        </HStack>

        {payload ?
          <Text size="sm" color={themeToken("secondary.700")}>
            Parsed values: {payload}
          </Text>
        : null}
      </VStack>
    </Box>
  );
}

export function FormSection() {
  const { t } = useTranslation();
  return (
    <>
      <h1>Form</h1>
      <p>
        <Trans i18nKey="form.intro" components={{ strong: <strong /> }} />
      </p>

      <h2>{t("form.examplesFormControl")}</h2>
      <LiveExample
        code={`import {
  FormControl,
  FormError,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Text,
  themeToken,
  VStack,
} from "kovax-react";

<VStack align="stretch" gap={24} maxW={400}>
  <VStack align="stretch" gap={4}>
    <Heading level={5}>Contact details</Heading>
    <Text size="sm" color={themeToken("secondary.600")}>
      FormControl passes invalid/required/disabled to Input, FormLabel, and FormHelperText via context (explicit props still win).
    </Text>
  </VStack>
  <FormControl isRequired>
    <FormLabel htmlFor="demo-email">Email</FormLabel>
    <Input id="demo-email" type="email" placeholder="you@example.com" />
    <FormHelperText>We never share your email with third parties.</FormHelperText>
  </FormControl>

  <FormControl isInvalid>
    <FormLabel htmlFor="demo-error">Name</FormLabel>
    <Input id="demo-error" placeholder="Required field" />
    <FormError>Please enter your name</FormError>
  </FormControl>
</VStack>`}
      >
        <VStack align="stretch" gap={24} maxW={400}>
          <VStack align="stretch" gap={4}>
            <Heading level={5}>Contact details</Heading>
            <Text size="sm" color={themeToken("secondary.600")}>
              FormControl passes invalid/required/disabled to Input, FormLabel, and FormHelperText via context (explicit props still win).
            </Text>
          </VStack>
          <FormControl isRequired>
            <FormLabel htmlFor="demo-email">Email</FormLabel>
            <Input id="demo-email" type="email" placeholder="you@example.com" />
            <FormHelperText>We never share your email with third parties.</FormHelperText>
          </FormControl>

          <FormControl isInvalid>
            <FormLabel htmlFor="demo-error">Name</FormLabel>
            <Input id="demo-error" placeholder="Required field" />
            <FormError>Please enter your name</FormError>
          </FormControl>
        </VStack>
      </LiveExample>

      <h2>{t("form.examplesFormGroup")}</h2>
      <LiveExample
        code={`import {
  FormControl,
  FormGroup,
  FormLabel,
  Heading,
  Input,
  Text,
  themeToken,
  VStack,
} from "kovax-react";

<VStack align="stretch" gap={16}>
  <VStack align="stretch" gap={4}>
    <Heading level={4}>Profile</Heading>
    <Text size="sm" color={themeToken("secondary.600")}>
      Multiple fields in one group
    </Text>
  </VStack>
  <FormGroup>
    <FormControl>
      <FormLabel htmlFor="demo-fn">First name</FormLabel>
      <Input id="demo-fn" placeholder="Jane" />
    </FormControl>
    <FormControl>
      <FormLabel htmlFor="demo-ln">Last name</FormLabel>
      <Input id="demo-ln" placeholder="Doe" />
    </FormControl>
  </FormGroup>
</VStack>`}
      >
        <VStack align="stretch" gap={16}>
          <VStack align="stretch" gap={4}>
            <Heading level={4}>Profile</Heading>
            <Text size="sm" color={themeToken("secondary.600")}>
              Multiple fields in one group
            </Text>
          </VStack>
          <FormGroup>
            <FormControl>
              <FormLabel htmlFor="demo-fn">First name</FormLabel>
              <Input id="demo-fn" placeholder="Jane" />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="demo-ln">Last name</FormLabel>
              <Input id="demo-ln" placeholder="Doe" />
            </FormControl>
          </FormGroup>
        </VStack>
      </LiveExample>

      <h2>{t("form.examplesFormActions")}</h2>
      <LiveExample
        code={`import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  Text,
  themeToken,
  VStack,
} from "kovax-react";

function Demo() {
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  return (
    <Box as="form" onSubmit={(e) => { e.preventDefault(); setStatus(email || "(empty)"); }} maxW={440} w="100%" p={themeToken("spacing.md")} borderRadius={themeToken("borderRadius.md")} border={\`1px solid \${themeToken("secondary.200")}\`} boxShadow={themeToken("shadow.sm")}>
      <VStack align="stretch" gap={themeToken("spacing.md")}>
        <Heading level={5}>Quick message</Heading>
        <FormControl isRequired>
          <FormLabel htmlFor="email-act">Email</FormLabel>
          <Input id="email-act" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
          <FormHelperText>Optional helper under the field.</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="note-act">Note</FormLabel>
          <Input id="note-act" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Optional" />
        </FormControl>
        <HStack gap={themeToken("spacing.sm")} wrap="wrap">
          <Button type="submit">Send</Button>
          <Button type="button" variant="outline" color="secondary" onClick={() => { setEmail(""); setNote(""); setStatus(null); }}>Reset</Button>
        </HStack>
        {status ? <Text size="sm">Submitted (demo): {status}</Text> : null}
      </VStack>
    </Box>
  );
}

<Demo />`}
      >
        <VStack align="stretch" gap={themeToken("spacing.sm")}>
          <Text size="sm" color={themeToken("secondary.600")}>
            Native <code>&lt;form&gt;</code> via polymorphic <code>Box as=&quot;form&quot;</code>; primary submit and outline reset.
          </Text>
          <ContactFormWithButtonsDemo />
        </VStack>
      </LiveExample>

      <h2>{t("form.examplesReactHookForm")}</h2>
      <LiveExample
        code={`import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormError,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Text,
  themeToken,
  VStack,
} from "kovax-react";
import { Controller, useForm } from "react-hook-form";

type Values = { email: string; password: string };

function Demo() {
  const { control, handleSubmit, formState, reset } = useForm<Values>({
    defaultValues: { email: "", password: "" },
    mode: "onBlur",
  });
  const [payload, setPayload] = useState<string | null>(null);
  const { errors } = formState;

  return (
    <Box as="form" onSubmit={handleSubmit((data) => setPayload(JSON.stringify(data)))} maxW={440} w="100%">
      <VStack align="stretch" gap={themeToken("spacing.md")}>
        <FormControl isInvalid={Boolean(errors.email)}>
          <FormLabel htmlFor="rhf-email">Email</FormLabel>
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              validate: (v: string) => v.includes("@") || "Enter a valid email address",
            }}
            render={({ field }) => <Input {...field} id="rhf-email" type="email" placeholder="you@example.com" />}
          />
          {errors.email ? <FormError>{errors.email.message}</FormError> : <FormHelperText>Validated on blur.</FormHelperText>}
        </FormControl>
        <FormControl isInvalid={Boolean(errors.password)}>
          <FormLabel htmlFor="rhf-password">Password</FormLabel>
          <Controller
            name="password"
            control={control}
            rules={{ required: "Required", minLength: { value: 8, message: "Min 8 chars" } }}
            render={({ field }) => <Input {...field} id="rhf-password" type="password" />}
          />
          <FormHelperText>Min 8 characters.</FormHelperText>
          {errors.password ? <FormError>{errors.password.message}</FormError> : null}
        </FormControl>
        <HStack gap={themeToken("spacing.sm")} wrap="wrap">
          <Button type="submit">Sign up</Button>
          <Button type="button" variant="outline" color="secondary" onClick={() => { reset(); setPayload(null); }}>Clear</Button>
        </HStack>
        {payload ? <Text size="sm">{payload}</Text> : null}
      </VStack>
    </Box>
  );
}

<Demo />`}
      >
        <VStack align="stretch" gap={themeToken("spacing.sm")}>
          <Text size="sm" color={themeToken("secondary.600")}>
            <code>react-hook-form</code> is only a playground dependency — wire fields with <code>Controller</code> so refs and controlled values match Kovax <code>Input</code>.
          </Text>
          <ReactHookFormDemo />
        </VStack>
      </LiveExample>
    </>
  );
}
