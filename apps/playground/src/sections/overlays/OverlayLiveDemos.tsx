import { useState } from "react";
import {
  Button,
  Dialog,
  Dropdown,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  Popover,
  Text,
  themeToken,
  Tooltip,
  useToast,
  VStack,
} from "kovax-react";

export function TooltipBasicDemo() {
  return (
    <VStack align="flex-start" gap={16}>
      <Tooltip content="Commit saves your draft locally." placement="top">
        <Button type="button" variant="outline" color="secondary">
          Hover me
        </Button>
      </Tooltip>
      <Text size="sm" color={themeToken("secondary.600")}>
        Tooltip uses a portal and delays to avoid flicker.
      </Text>
    </VStack>
  );
}

export function TooltipPlacementsDemo() {
  return (
    <HStack gap={12} align="flex-start" wrap="wrap">
      <Tooltip content="Above" placement="top">
        <Button type="button" variant="outline" color="secondary">
          Top
        </Button>
      </Tooltip>
      <Tooltip content="Below" placement="bottom">
        <Button type="button" variant="outline" color="secondary">
          Bottom
        </Button>
      </Tooltip>
      <Tooltip content="To the left" placement="left">
        <Button type="button" variant="outline" color="secondary">
          Left
        </Button>
      </Tooltip>
      <Tooltip content="To the right" placement="right">
        <Button type="button" variant="outline" color="secondary">
          Right
        </Button>
      </Tooltip>
    </HStack>
  );
}

export function PopoverDemo() {
  return (
    <VStack align="flex-start" gap={16}>
      <Popover.Root>
        <Popover.Trigger>
          <Button type="button" variant="outline" color="secondary">
            Menu (bottom-start)
          </Button>
        </Popover.Trigger>
        <Popover.Content placement="bottom-start">
          <VStack align="stretch" gap={8}>
            <Text size="sm">Edit</Text>
            <Text size="sm">Duplicate</Text>
            <Text size="sm">Archive</Text>
          </VStack>
        </Popover.Content>
      </Popover.Root>
      <Popover.Root>
        <Popover.Trigger>
          <Button type="button" variant="outline" color="primary">
            Above (top-end, same width)
          </Button>
        </Popover.Trigger>
        <Popover.Content placement="top-end" sameWidth>
          <Text size="sm">Panel aligns to the trigger edge.</Text>
        </Popover.Content>
      </Popover.Root>
    </VStack>
  );
}

export function PopoverAdvancedDemo() {
  const [open, setOpen] = useState(false);
  return (
    <VStack align="flex-start" gap={16}>
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger>
          <Button type="button" variant="outline" color="secondary">
            Controlled
          </Button>
        </Popover.Trigger>
        <Popover.Content placement="bottom-start">
          <VStack align="stretch" gap={8}>
            <Text size="sm">State is lifted to the parent.</Text>
            <Button type="button" variant="ghost" color="secondary" onClick={() => setOpen(false)}>
              Close from inside
            </Button>
          </VStack>
        </Popover.Content>
      </Popover.Root>

      <Dropdown.Root>
        <Dropdown.Trigger>
          <Button type="button" variant="outline" color="primary">
            Dropdown alias
          </Button>
        </Dropdown.Trigger>
        <Dropdown.Content placement="bottom-end">
          <VStack align="stretch" gap={8}>
            <Text size="sm">Rename</Text>
            <Text size="sm">Move to…</Text>
          </VStack>
        </Dropdown.Content>
      </Dropdown.Root>

      <Popover.Root>
        <Popover.Trigger>
          <Button type="button" variant="ghost" color="secondary">
            Right side panel
          </Button>
        </Popover.Trigger>
        <Popover.Content placement="right-start" sideOffset={12}>
          <Text size="sm">placement=&quot;right-start&quot;</Text>
        </Popover.Content>
      </Popover.Root>
    </VStack>
  );
}

export function ModalConfirmDemo() {
  return (
    <Modal.Root>
      <Modal.Trigger>
        <Button type="button" variant="outline" color="secondary">
          Discard draft
        </Button>
      </Modal.Trigger>
      <Modal.Content size="sm">
        <Modal.Header>
          <Modal.Title>Discard draft?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Modal.Description>Unsaved changes will be lost.</Modal.Description>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Close>
            <Button type="button" variant="outline" color="secondary">
              Cancel
            </Button>
          </Modal.Close>
          <Modal.Close>
            <Button type="button" variant="solid" color="primary">
              Discard
            </Button>
          </Modal.Close>
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  );
}

export function ModalFormDemo() {
  return (
    <Modal.Root>
      <Modal.Trigger>
        <Button type="button" variant="outline" color="primary">
          Quick edit
        </Button>
      </Modal.Trigger>
      <Modal.Content size="lg">
        <Modal.Header>
          <Modal.Title>Quick edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Modal.Description>Scroll appears here when the body is tall.</Modal.Description>
          <VStack align="stretch" gap={12} style={{ marginTop: themeToken("spacing.md") }}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input defaultValue="Ada" />
            </FormControl>
            <FormControl>
              <FormLabel>Note</FormLabel>
              <Input />
            </FormControl>
          </VStack>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Close>
            <Button type="button" variant="outline" color="secondary">
              Close
            </Button>
          </Modal.Close>
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  );
}

export function ModalMediaDemo() {
  return (
    <Modal.Root>
      <Modal.Trigger>
        <Button type="button" variant="ghost" color="secondary">
          Preview
        </Button>
      </Modal.Trigger>
      <Modal.Content size="xl">
        <Modal.Header>
          <Modal.Title>Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body flush>
          <div
            role="img"
            aria-label="Placeholder"
            style={{
              width: "100%",
              aspectRatio: "16 / 9",
              background: `linear-gradient(135deg, ${themeToken("secondary.100")}, ${themeToken("primary.100")})`,
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Modal.Close>
            <Button type="button" variant="solid" color="primary">
              Done
            </Button>
          </Modal.Close>
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  );
}

export function ModalFullDemo() {
  return (
    <Modal.Root>
      <Modal.Trigger>
        <Button type="button" variant="outline" color="secondary">
          Open wide
        </Button>
      </Modal.Trigger>
      <Modal.Content size="full">
        <Modal.Header>
          <Modal.Title>Wide workspace</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Modal.Description>
            size=&quot;full&quot; uses nearly the full viewport width (minus margin).
          </Modal.Description>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Close>
            <Button type="button" variant="solid" color="primary">
              OK
            </Button>
          </Modal.Close>
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  );
}

export function ModalScrollDemo() {
  return (
    <Modal.Root>
      <Modal.Trigger>
        <Button type="button" variant="outline" color="secondary">
          Long content
        </Button>
      </Modal.Trigger>
      <Modal.Content size="md">
        <Modal.Header>
          <Modal.Title>Terms</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {Array.from({ length: 24 }, (_, i) => (
            <Text key={i} as="p" size="sm" style={{ margin: "0 0 0.75rem" }}>
              Paragraph {i + 1}. Only the modal body scrolls; header and footer stay visible.
            </Text>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Modal.Close>
            <Button type="button" variant="solid" color="primary">
              Accept
            </Button>
          </Modal.Close>
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  );
}

export function ToastSnackDemo() {
  const { toast, dismissAll } = useToast();
  return (
    <VStack align="flex-start" gap={12}>
      <HStack gap={12} align="flex-start" wrap="wrap">
        <Button
          type="button"
          variant="outline"
          color="secondary"
          onClick={() =>
            toast({
              title: "Saved",
              description: "Draft stored locally.",
              variant: "success",
              durationSeconds: 4,
            })
          }
        >
          Success (4s)
        </Button>
        <Button
          type="button"
          variant="outline"
          color="secondary"
          onClick={() =>
            toast({
              title: "Network lag",
              description: "Retry in a moment.",
              variant: "warning",
              durationSeconds: 5,
            })
          }
        >
          Warning (5s)
        </Button>
        <Button
          type="button"
          variant="outline"
          color="secondary"
          onClick={() =>
            toast({
              title: "Payment failed",
              description: "Card was declined.",
              variant: "error",
              durationSeconds: 6,
            })
          }
        >
          Error (6s)
        </Button>
        <Button
          type="button"
          variant="outline"
          color="primary"
          onClick={() =>
            toast({
              title: "Message archived",
              durationSeconds: 8,
              action: {
                label: "Undo",
                onClick: () => {},
              },
            })
          }
        >
          With action (8s)
        </Button>
        <Button type="button" variant="outline" color="secondary" onClick={() => dismissAll()}>
          Dismiss all
        </Button>
      </HStack>
      <HStack gap={12} align="flex-start" wrap="wrap">
        <Button
          type="button"
          variant="ghost"
          color="secondary"
          onClick={() =>
            toast({
              title: "Top notice",
              placement: "top",
              durationSeconds: 3,
            })
          }
        >
          placement: top
        </Button>
        <Button
          type="button"
          variant="ghost"
          color="secondary"
          onClick={() =>
            toast({
              title: "Bottom-left corner",
              placement: "bottom-left",
              durationSeconds: 5,
            })
          }
        >
          bottom-left
        </Button>
        <Button
          type="button"
          variant="ghost"
          color="secondary"
          onClick={() =>
            toast({
              title: "Bottom-right corner",
              placement: "bottom-right",
              durationSeconds: 5,
            })
          }
        >
          bottom-right
        </Button>
        <Button
          type="button"
          variant="ghost"
          color="secondary"
          onClick={() =>
            toast({
              title: "Large toast",
              description: 'size="lg"',
              size: "lg",
              durationSeconds: 7,
            })
          }
        >
          size lg (7s)
        </Button>
        <Button
          type="button"
          variant="ghost"
          color="primary"
          onClick={() =>
            toast({
              title: "Confirm to dismiss",
              description: "× hidden until you tap the action.",
              persistUntilAction: true,
              action: {
                label: "OK",
                onClick: () => {},
              },
            })
          }
        >
          persistUntilAction
        </Button>
      </HStack>
      <Text size="sm" color={themeToken("secondary.600")}>
        This playground mounts{" "}
        <code style={{ fontSize: "0.85em" }}>ToastProvider</code> in{" "}
        <code style={{ fontSize: "0.85em" }}>main.tsx</code>.{" "}
        <code style={{ fontSize: "0.85em" }}>useToast</code> lives in{" "}
        <code style={{ fontSize: "0.85em" }}>useToast.ts</code> and is exported from{" "}
        <code style={{ fontSize: "0.85em" }}>kovax-react</code>.
      </Text>
    </VStack>
  );
}

export function DialogDemo() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button type="button" variant="outline" color="primary">
          Open dialog
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>Example dialog</Dialog.Title>
        <Dialog.Description>
          Focus stays inside until you press Escape, click the backdrop, or close.
        </Dialog.Description>
        <Dialog.Close>
          <Button type="button" variant="solid" color="primary">
            Done
          </Button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  );
}
