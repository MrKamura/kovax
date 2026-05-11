import { Trans, useTranslation } from "react-i18next";
import {
  AspectRatio,
  Bleed,
  Box,
  Center,
  Container,
  Flex,
  Grid,
  Heading,
  HStack,
  Separator,
  Stack,
  Sticky,
  Text,
  VStack,
  VisuallyHidden,
  themeToken,
} from "kovax-react";
import { DocPropsTable } from "../components/DocPropsTable";
import { LiveExample } from "../components/LiveExample";
import { layoutPropRows } from "./layout/layoutPropRows";

const brMd = themeToken("borderRadius.md");
const brSm = themeToken("borderRadius.sm");

export function LayoutSection() {
  const { t } = useTranslation();
  return (
    <>
      <h1>Layout</h1>
      <p>
        <Trans
          i18nKey="layout.intro"
          components={{
            code: <span className="doc-code" />,
            strong: <strong />,
          }}
        />
      </p>

      {/* Box */}
      <h2>Box</h2>
      <DocPropsTable title={t("layout.boxPropsTitle")} rows={[...layoutPropRows.box]} />
      <LiveExample
        code={`import { Box, Heading, Text, themeToken } from "kovax-react";

<Box
  as="section"
  p={16}
  backgroundColor={themeToken("secondary.100")}
  borderRadius={themeToken("borderRadius.md")}
>
  <Heading level={3} size="lg">
    Section
  </Heading>
  <Text mt={8} color={themeToken("secondary.700")}>
    Polymorphic Box as a section shell plus typography from the theme.
  </Text>
</Box>`}
      >
        <Box
          as="section"
          p={16}
          backgroundColor={themeToken("secondary.100")}
          borderRadius={brMd}
        >
          <Heading level={3} size="lg">
            Section
          </Heading>
          <Text mt={8} color={themeToken("secondary.700")}>
            Polymorphic Box as a section shell plus typography from the theme.
          </Text>
        </Box>
      </LiveExample>

      {/* Container */}
      <h2>Container</h2>
      <DocPropsTable rows={[...layoutPropRows.container]} />
      <LiveExample
        code={`import { Container, Text, themeToken } from "kovax-react";

<Container maxW="sm" px={16} py={16} backgroundColor={themeToken("secondary.50")} borderRadius={themeToken("borderRadius.md")}>
  <Text color={themeToken("secondary.700")} size="base">
    Narrow column (maxW: sm), padding via px / py and secondary text color from tokens.
  </Text>
</Container>`}
      >
        <Container
          maxW="sm"
          px={16}
          py={16}
          backgroundColor={themeToken("secondary.50")}
          borderRadius={brMd}
        >
          <Text color={themeToken("secondary.700")} size="base">
            Narrow column (maxW: sm), padding via px / py and secondary text color from tokens.
          </Text>
        </Container>
      </LiveExample>

      {/* Stack family */}
      <h2>Stack, HStack, VStack</h2>
      <DocPropsTable rows={[...layoutPropRows.stack]} />
      <p className="layout-doc-hint">
        <Trans
          i18nKey="layout.stackHint"
          components={{ code: <span className="doc-code" /> }}
        />
      </p>
      <LiveExample
        code={`import { Box, HStack, Stack, Text, themeToken, VStack } from "kovax-react";

<VStack gap={16} align="stretch">
  <HStack gap={12} align="center">
    <Box px={10} py={6} backgroundColor={themeToken("secondary.200")} borderRadius={themeToken("borderRadius.sm")}>
      <Text color={themeToken("secondary.800")} fontWeight={500}>Left</Text>
    </Box>
    <Box px={10} py={6} backgroundColor={themeToken("primary.100")} borderRadius={themeToken("borderRadius.sm")}>
      <Text color={themeToken("primary.800")} fontWeight={500}>Right</Text>
    </Box>
  </HStack>
  <Stack direction="row-reverse" gap={8}>
    <Box px={8} py={4} backgroundColor={themeToken("error.100")} borderRadius={themeToken("borderRadius.sm")}>
      <Text color={themeToken("error.800")} size="sm">First in DOM</Text>
    </Box>
    <Box px={8} py={4} backgroundColor={themeToken("success.100")} borderRadius={themeToken("borderRadius.sm")}>
      <Text color={themeToken("success.900")} size="sm">Second in DOM</Text>
    </Box>
  </Stack>
  <VStack gap={8} align="stretch">
    <Box h={28} backgroundColor={themeToken("warning.200")} borderRadius={themeToken("borderRadius.sm")} />
    <Box h={28} backgroundColor={themeToken("primary.200")} borderRadius={themeToken("borderRadius.sm")} />
  </VStack>
</VStack>`}
      >
        <VStack gap={16} align="stretch">
          <HStack gap={12} align="center">
            <Box
              px={10}
              py={6}
              backgroundColor={themeToken("secondary.200")}
              borderRadius={brSm}
            >
              <Text color={themeToken("secondary.800")} fontWeight={500}>
                Left
              </Text>
            </Box>
            <Box
              px={10}
              py={6}
              backgroundColor={themeToken("primary.100")}
              borderRadius={brSm}
            >
              <Text color={themeToken("primary.800")} fontWeight={500}>
                Right
              </Text>
            </Box>
          </HStack>
          <Stack direction="row-reverse" gap={8}>
            <Box px={8} py={4} backgroundColor={themeToken("error.100")} borderRadius={brSm}>
              <Text color={themeToken("error.800")} size="sm">
                First in DOM
              </Text>
            </Box>
            <Box px={8} py={4} backgroundColor={themeToken("success.100")} borderRadius={brSm}>
              <Text color={themeToken("success.900")} size="sm">
                Second in DOM
              </Text>
            </Box>
          </Stack>
          <VStack gap={8} align="stretch">
            <Box h={28} backgroundColor={themeToken("warning.200")} borderRadius={brSm} />
            <Box h={28} backgroundColor={themeToken("primary.200")} borderRadius={brSm} />
          </VStack>
        </VStack>
      </LiveExample>

      {/* Flex */}
      <h2>Flex</h2>
      <DocPropsTable rows={[...layoutPropRows.flex]} />
      <LiveExample
        code={`import { Box, Flex, Text, themeToken } from "kovax-react";

<Flex wrap="wrap" gap={12} p={12} backgroundColor={themeToken("secondary.50")} borderRadius={themeToken("borderRadius.md")}>
  <Box flex={1} minW={100} p={10} backgroundColor={themeToken("secondary.200")} borderRadius={themeToken("borderRadius.sm")}>
    <Text color={themeToken("secondary.900")} fontWeight={600}>A</Text>
  </Box>
  <Box flex={1} minW={100} p={10} backgroundColor={themeToken("secondary.200")} borderRadius={themeToken("borderRadius.sm")}>
    <Text color={themeToken("secondary.900")} fontWeight={600}>B</Text>
  </Box>
  <Box flex={1} minW={100} p={10} backgroundColor={themeToken("secondary.200")} borderRadius={themeToken("borderRadius.sm")}>
    <Text color={themeToken("secondary.900")} fontWeight={600}>C</Text>
  </Box>
</Flex>`}
      >
        <Flex
          wrap="wrap"
          gap={12}
          p={12}
          backgroundColor={themeToken("secondary.50")}
          borderRadius={brMd}
        >
          <Box flex={1} minW={100} p={10} backgroundColor={themeToken("secondary.200")} borderRadius={brSm}>
            <Text color={themeToken("secondary.900")} fontWeight={600}>
              A
            </Text>
          </Box>
          <Box flex={1} minW={100} p={10} backgroundColor={themeToken("secondary.200")} borderRadius={brSm}>
            <Text color={themeToken("secondary.900")} fontWeight={600}>
              B
            </Text>
          </Box>
          <Box flex={1} minW={100} p={10} backgroundColor={themeToken("secondary.200")} borderRadius={brSm}>
            <Text color={themeToken("secondary.900")} fontWeight={600}>
              C
            </Text>
          </Box>
        </Flex>
      </LiveExample>

      {/* Grid */}
      <h2>Grid</h2>
      <DocPropsTable rows={[...layoutPropRows.grid]} />
      <LiveExample
        code={`import { Box, Grid, Text, themeToken } from "kovax-react";

<Grid columns={2} gap={themeToken("spacing.md")}>
  <Box p={12} backgroundColor={themeToken("secondary.100")} borderRadius={themeToken("borderRadius.md")}>
    <Text color={themeToken("secondary.800")}>Cell 1</Text>
  </Box>
  <Box p={12} backgroundColor={themeToken("secondary.100")} borderRadius={themeToken("borderRadius.md")}>
    <Text color={themeToken("secondary.800")}>Cell 2</Text>
  </Box>
</Grid>`}
      >
        <Grid columns={2} gap={themeToken("spacing.md")}>
          <Box p={12} backgroundColor={themeToken("secondary.100")} borderRadius={brMd}>
            <Text color={themeToken("secondary.800")}>Cell 1</Text>
          </Box>
          <Box p={12} backgroundColor={themeToken("secondary.100")} borderRadius={brMd}>
            <Text color={themeToken("secondary.800")}>Cell 2</Text>
          </Box>
        </Grid>
      </LiveExample>

      {/* Center */}
      <h2>Center</h2>
      <DocPropsTable rows={[...layoutPropRows.center]} />
      <LiveExample
        code={`import { Box, Center, Text, themeToken } from "kovax-react";

<Center minH={96} backgroundColor={themeToken("secondary.50")} borderRadius={themeToken("borderRadius.md")}>
  <Box px={14} py={8} backgroundColor={themeToken("primary.500")} borderRadius={themeToken("borderRadius.sm")}>
    <Text color={themeToken("white")} fontWeight={600}>
      Centered on both axes
    </Text>
  </Box>
</Center>`}
      >
        <Center minH={96} backgroundColor={themeToken("secondary.50")} borderRadius={brMd}>
          <Box
            px={14}
            py={8}
            backgroundColor={themeToken("primary.500")}
            borderRadius={brSm}
          >
            <Text color={themeToken("white")} fontWeight={600}>
              Centered on both axes
            </Text>
          </Box>
        </Center>
      </LiveExample>

      {/* Flex + Center (composition) */}
      <h2>Flex + Center</h2>
      <p className="layout-doc-hint">{t("layout.flexCenterHint")}</p>
      <LiveExample
        code={`import { Box, Center, Flex, Text, themeToken } from "kovax-react";

<Flex minH={120} backgroundColor={themeToken("secondary.50")} borderRadius={themeToken("borderRadius.md")} p={8}>
  <Center flex={1}>
    <Box px={16} py={8} backgroundColor={themeToken("primary.500")} borderRadius={themeToken("borderRadius.md")}>
      <Text color={themeToken("white")} fontWeight={600}>
        Centered
      </Text>
    </Box>
  </Center>
</Flex>`}
      >
        <Flex minH={120} backgroundColor={themeToken("secondary.50")} borderRadius={brMd} p={8}>
          <Center flex={1}>
            <Box
              px={16}
              py={8}
              backgroundColor={themeToken("primary.500")}
              borderRadius={brMd}
            >
              <Text color={themeToken("white")} fontWeight={600}>
                Centered
              </Text>
            </Box>
          </Center>
        </Flex>
      </LiveExample>

      {/* Separator */}
      <h2>Separator</h2>
      <DocPropsTable rows={[...layoutPropRows.separator]} />
      <LiveExample
        code={`import { Box, HStack, Separator, Text, themeToken, VStack } from "kovax-react";

<VStack gap={16} align="stretch">
  <Text color={themeToken("secondary.800")}>Section A</Text>
  <Separator color={themeToken("secondary.200")} />
  <Text color={themeToken("secondary.800")}>Section B</Text>
  <HStack gap={12} align="center" minH={32}>
    <Text as="span" color={themeToken("secondary.700")}>Left</Text>
    <Separator orientation="vertical" color={themeToken("secondary.200")} />
    <Text as="span" color={themeToken("secondary.700")}>Right</Text>
  </HStack>
</VStack>`}
      >
        <VStack gap={16} align="stretch">
          <Text color={themeToken("secondary.800")}>Section A</Text>
          <Separator color={themeToken("secondary.200")} />
          <Text color={themeToken("secondary.800")}>Section B</Text>
          <HStack gap={12} align="center" minH={32}>
            <Text as="span" color={themeToken("secondary.700")}>
              Left
            </Text>
            <Separator orientation="vertical" color={themeToken("secondary.200")} />
            <Text as="span" color={themeToken("secondary.700")}>
              Right
            </Text>
          </HStack>
        </VStack>
      </LiveExample>

      {/* Bleed */}
      <h2>Bleed</h2>
      <DocPropsTable rows={[...layoutPropRows.bleed]} />
      <LiveExample
        code={`import { Bleed, Box, Text, themeToken } from "kovax-react";

<Box p={20} backgroundColor={themeToken("secondary.50")} borderRadius={themeToken("borderRadius.md")}>
  <Text mb={8} color={themeToken("secondary.700")} size="sm">
    Text respects parent padding
  </Text>
  <Bleed horizontal={16}>
    <Box py={12} px={16} backgroundColor={themeToken("primary.100")} borderRadius={themeToken("borderRadius.sm")}>
      <Text color={themeToken("primary.900")}>Content breaks out with negative horizontal margins</Text>
    </Box>
  </Bleed>
</Box>`}
      >
        <Box p={20} backgroundColor={themeToken("secondary.50")} borderRadius={brMd}>
          <Text mb={8} color={themeToken("secondary.700")} size="sm">
            Text respects parent padding
          </Text>
          <Bleed horizontal={16}>
            <Box py={12} px={16} backgroundColor={themeToken("primary.100")} borderRadius={brSm}>
              <Text color={themeToken("primary.900")}>
                Content breaks out with negative horizontal margins
              </Text>
            </Box>
          </Bleed>
        </Box>
      </LiveExample>

      {/* AspectRatio */}
      <h2>AspectRatio</h2>
      <DocPropsTable rows={[...layoutPropRows.aspectRatio]} />
      <LiveExample
        code={`import { AspectRatio, Box, Text, themeToken } from "kovax-react";

<AspectRatio ratio={16 / 9} maxW={320} borderRadius={themeToken("borderRadius.md")}>
  <Box
    display="flex"
    alignItems="center"
    justifyContent="center"
    backgroundColor={themeToken("primary.300")}
    width="100%"
    height="100%"
  >
    <Text color={themeToken("white")} fontWeight={600}>
      16:9
    </Text>
  </Box>
</AspectRatio>`}
      >
        <AspectRatio ratio={16 / 9} maxW={320} borderRadius={brMd}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            backgroundColor={themeToken("primary.300")}
            width="100%"
            height="100%"
          >
            <Text color={themeToken("white")} fontWeight={600}>
              16:9
            </Text>
          </Box>
        </AspectRatio>
      </LiveExample>

      {/* VisuallyHidden */}
      <h2>VisuallyHidden</h2>
      <DocPropsTable rows={[...layoutPropRows.visuallyHidden]} />
      <LiveExample
        code={`import { themeToken, VisuallyHidden } from "kovax-react";

<button
  type="button"
  style={{
    padding: \`\${themeToken("spacing.sm")} \${themeToken("spacing.md")}\`,
    borderRadius: themeToken("borderRadius.md"),
    border: \`1px solid \${themeToken("secondary.300")}\`,
    background: themeToken("white"),
    cursor: "pointer",
  }}
>
  <span aria-hidden>☰</span>
  <VisuallyHidden>Open menu</VisuallyHidden>
</button>`}
      >
        <Box>
          <button
            type="button"
            style={{
              padding: `${themeToken("spacing.sm")} ${themeToken("spacing.md")}`,
              borderRadius: themeToken("borderRadius.md"),
              border: `1px solid ${themeToken("secondary.300")}`,
              background: themeToken("white"),
              cursor: "pointer",
            }}
          >
            <span aria-hidden>☰</span>
            <VisuallyHidden>Open menu</VisuallyHidden>
          </button>
          <p className="layout-doc-hint" style={{ marginBottom: 0 }}>
            The “Open menu” label is exposed to screen readers and visually hidden.
          </p>
        </Box>
      </LiveExample>

      {/* Sticky */}
      <h2>Sticky</h2>
      <DocPropsTable rows={[...layoutPropRows.sticky]} />
      <LiveExample
        code={`import { Box, Sticky, Text, themeToken } from "kovax-react";

<Box maxH={200} style={{ overflow: "auto", border: \`1px solid \${themeToken("secondary.200")}\`, borderRadius: themeToken("borderRadius.md") }}>
  <Sticky top={0} shadow={themeToken("shadow.sm")}>
    <Box backgroundColor={themeToken("secondary.100")} px={12} py={8}>
      <Text fontWeight={600} color={themeToken("secondary.900")}>
        Scroll the region — this bar sticks
      </Text>
    </Box>
  </Sticky>
  {Array.from({ length: 10 }).map((_, i) => (
    <Box key={i} py={10} px={12} style={{ borderBottom: \`1px solid \${themeToken("secondary.100")}\` }}>
      <Text color={themeToken("secondary.700")}>Content row {i + 1}</Text>
    </Box>
  ))}
</Box>`}
      >
        <Box
          maxH={200}
          style={{
            overflow: "auto",
            border: `1px solid ${themeToken("secondary.200")}`,
            borderRadius: brMd,
          }}
        >
          <Sticky top={0} shadow={themeToken("shadow.sm")}>
            <Box backgroundColor={themeToken("secondary.100")} px={12} py={8}>
              <Text fontWeight={600} color={themeToken("secondary.900")}>
                Scroll the region — this bar sticks
              </Text>
            </Box>
          </Sticky>
          {Array.from({ length: 10 }).map((_, i) => (
            <Box
              key={i}
              py={10}
              px={12}
              style={{
                borderBottom: `1px solid ${themeToken("secondary.100")}`,
              }}
            >
              <Text color={themeToken("secondary.700")}>Content row {i + 1}</Text>
            </Box>
          ))}
        </Box>
      </LiveExample>
    </>
  );
}
