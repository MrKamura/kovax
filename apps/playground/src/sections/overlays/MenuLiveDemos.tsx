import { useState } from "react";
import { Button, Menu, Text, themeToken } from "kovax-react";

export function MenuBasicsDemo() {
  return (
    <Menu.Root>
      <Menu.Trigger>
        <Button type="button" variant="outline" color="secondary">
          Actions (animated)
        </Button>
      </Menu.Trigger>
      <Menu.Content placement="bottom-start">
        <Menu.Item onSelect={() => {}}>
          <Text size="sm">Edit</Text>
        </Menu.Item>
        <Menu.Item onSelect={() => {}}>
          <Text size="sm">Duplicate</Text>
        </Menu.Item>
        <Menu.Separator />
        <Menu.Item disabled>
          <Text size="sm">Unavailable</Text>
        </Menu.Item>
        <Menu.Item onSelect={() => {}}>
          <Text size="sm" style={{ color: themeToken("error.600") }}>
            Delete
          </Text>
        </Menu.Item>
      </Menu.Content>
    </Menu.Root>
  );
}

export function MenuControlledDemo() {
  const [open, setOpen] = useState(false);
  const [last, setLast] = useState<string>("—");
  return (
    <>
      <Menu.Root open={open} onOpenChange={setOpen}>
        <Menu.Trigger>
          <Button type="button" variant="outline" color="primary">
            Controlled ({open ? "open" : "closed"})
          </Button>
        </Menu.Trigger>
        <Menu.Content placement="bottom-start">
          <Menu.Item
            onSelect={() => {
              setLast("Profile");
            }}
          >
            <Text size="sm">Profile</Text>
          </Menu.Item>
          <Menu.Item
            onSelect={() => {
              setLast("Billing");
            }}
          >
            <Text size="sm">Billing</Text>
          </Menu.Item>
          <Menu.Separator />
          <Menu.Item
            onSelect={() => {
              setLast("Closed from item");
              setOpen(false);
            }}
          >
            <Text size="sm">Close programmatically</Text>
          </Menu.Item>
        </Menu.Content>
      </Menu.Root>
      <Text size="sm" color={themeToken("secondary.600")}>
        Last selection: {last}
      </Text>
    </>
  );
}

export function MenuSameWidthDemo() {
  return (
    <Menu.Root>
      <Menu.Trigger>
        <Button type="button" variant="outline" color="secondary">
          Wide trigger label — same width panel
        </Button>
      </Menu.Trigger>
      <Menu.Content placement="bottom-start" sameWidth>
        <Menu.Item onSelect={() => {}}>
          <Text size="sm">Compact row</Text>
        </Menu.Item>
        <Menu.Item onSelect={() => {}}>
          <Text size="sm">Another action</Text>
        </Menu.Item>
      </Menu.Content>
    </Menu.Root>
  );
}

export function MenuReducedMotionDemo() {
  return (
    <Menu.Root>
      <Menu.Trigger>
        <Button type="button" variant="ghost" color="secondary">
          motion=&quot;false&quot; (no enter animation)
        </Button>
      </Menu.Trigger>
      <Menu.Content placement="bottom-start" motion={false}>
        <Menu.Item onSelect={() => {}}>
          <Text size="sm">Instant panel</Text>
        </Menu.Item>
        <Menu.Item onSelect={() => {}}>
          <Text size="sm">Still has keyboard nav</Text>
        </Menu.Item>
      </Menu.Content>
    </Menu.Root>
  );
}
