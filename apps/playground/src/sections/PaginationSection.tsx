import { useState } from "react";
import {
  Pagination,
  Text,
  themeToken,
  VStack,
} from "kovax-react";
import { Trans, useTranslation } from "react-i18next";
import { LiveExample } from "../components/LiveExample";

export function PaginationSection() {
  const { t } = useTranslation();

  return (
    <>
      <h1>{t("pagination.pageTitle")}</h1>
      <p>
        <Trans
          i18nKey="pagination.intro"
          components={{ strong: <strong />, code: <code /> }}
        />
      </p>

      <h2>{t("pagination.examplesBasic")}</h2>
      <LiveExample
        code={`import { Pagination } from "kovax-react";
import { useState } from "react";

const [page, setPage] = useState(1);

<Pagination
  page={page}
  pageCount={24}
  onPageChange={setPage}
  aria-label="Results"
/>`}
      >
        <PaginationBasicDemo />
      </LiveExample>

      <h2>{t("pagination.examplesOutlineSm")}</h2>
      <LiveExample
        code={`import { Pagination } from "kovax-react";
import { useState } from "react";

const [page, setPage] = useState(3);

<Pagination
  page={page}
  pageCount={50}
  onPageChange={setPage}
  variant="outline"
  size="sm"
  aria-label="Compact pager"
/>`}
      >
        <PaginationOutlineDemo />
      </LiveExample>

      <h2>{t("pagination.examplesSiblings")}</h2>
      <p>{t("pagination.siblingsLead")}</p>
      <LiveExample
        code={`import { Pagination } from "kovax-react";
import { useState } from "react";

const [page, setPage] = useState(12);

<Pagination
  page={page}
  pageCount={80}
  onPageChange={setPage}
  siblingCount={2}
  aria-label="Wide window"
/>`}
      >
        <PaginationSiblingsDemo />
      </LiveExample>

      <h2>{t("pagination.examplesDisabled")}</h2>
      <LiveExample
        code={`import { Pagination } from "kovax-react";

<Pagination page={4} pageCount={10} onPageChange={() => {}} disabled aria-label="Loading" />`}
      >
        <Pagination
          page={4}
          pageCount={10}
          onPageChange={() => undefined}
          disabled
          aria-label={t("pagination.ariaLoading")}
        />
      </LiveExample>

      <h2>{t("pagination.examplesI18n")}</h2>
      <LiveExample
        code={`import { Pagination } from "kovax-react";
import { useState } from "react";

const [page, setPage] = useState(2);

<Pagination
  page={page}
  pageCount={12}
  onPageChange={setPage}
  previousAriaLabel="Back"
  nextAriaLabel="Forward"
  getPageAriaLabel={(p) => \`Go to page \${p}\`}
/>`}
      >
        <PaginationI18nDemo />
      </LiveExample>

      <Text size="xs" color={themeToken("secondary.600")} style={{ marginTop: themeToken("spacing.md") }}>
        <Trans i18nKey="pagination.docsHint" components={{ strong: <strong /> }} />
      </Text>
    </>
  );
}

function PaginationBasicDemo() {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  return (
    <VStack gap={themeToken("spacing.sm")} align="stretch">
      <Pagination
        page={page}
        pageCount={24}
        onPageChange={setPage}
        aria-label={t("pagination.ariaDemo")}
      />
      <Text size="sm" color={themeToken("secondary.600")}>
        {t("pagination.stateCurrent", { page })}
      </Text>
    </VStack>
  );
}

function PaginationOutlineDemo() {
  const { t } = useTranslation();
  const [page, setPage] = useState(3);
  return (
    <VStack gap={themeToken("spacing.sm")} align="stretch">
      <Pagination
        page={page}
        pageCount={50}
        onPageChange={setPage}
        variant="outline"
        size="sm"
        aria-label={t("pagination.ariaCompact")}
      />
      <Text size="sm" color={themeToken("secondary.600")}>
        {t("pagination.stateCurrent", { page })}
      </Text>
    </VStack>
  );
}

function PaginationSiblingsDemo() {
  const { t } = useTranslation();
  const [page, setPage] = useState(12);
  return (
    <VStack gap={themeToken("spacing.sm")} align="stretch">
      <Pagination
        page={page}
        pageCount={80}
        onPageChange={setPage}
        siblingCount={2}
        aria-label={t("pagination.ariaWide")}
      />
      <Text size="sm" color={themeToken("secondary.600")}>
        {t("pagination.stateCurrent", { page })}
      </Text>
    </VStack>
  );
}

function PaginationI18nDemo() {
  const { t } = useTranslation();
  const [page, setPage] = useState(2);
  return (
    <VStack gap={themeToken("spacing.sm")} align="stretch">
      <Pagination
        page={page}
        pageCount={12}
        onPageChange={setPage}
        previousAriaLabel={t("pagination.i18nPrev")}
        nextAriaLabel={t("pagination.i18nNext")}
        getPageAriaLabel={(p) => t("pagination.i18nPage", { p })}
        aria-label={t("pagination.ariaI18n")}
      />
      <Text size="sm" color={themeToken("secondary.600")}>
        {t("pagination.stateCurrent", { page })}
      </Text>
    </VStack>
  );
}
