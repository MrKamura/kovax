import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { useForm } from "react-hook-form";
import { FormLabel } from "../../../components/Form/FormLabel";
import { Input } from "../../../components/Input/Input";
import { FormField, FormFieldError } from "../index";

type Values = { email: string };

function EmailFieldForm({ onSubmit }: { onSubmit: (data: Values) => void }) {
  const { control, handleSubmit } = useForm<Values>({
    defaultValues: { email: "" },
    mode: "onBlur",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormField
        control={control}
        name="email"
        rules={{ required: "Email is required" }}
      >
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input id="email" aria-label="Email" data-testid="email" />
        <FormFieldError />
      </FormField>
      <button type="submit">Submit</button>
    </form>
  );
}

describe("react-hook-form FormField", () => {
  it("wires value, ref, and FormControl context to Input", async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();

    render(<EmailFieldForm onSubmit={onSubmit} />);

    const input = screen.getByTestId("email");
    await user.type(input, "a@b.co");
    expect(input).toHaveValue("a@b.co");
    expect(input).toHaveAttribute("required");
    expect(input).not.toHaveAttribute("aria-invalid", "true");

    await user.click(screen.getByRole("button", { name: "Submit" }));
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({ email: "a@b.co" }, expect.anything());
    });
  });

  it("sets isInvalid and renders FormFieldError after blur validation", async () => {
    const user = userEvent.setup();
    render(<EmailFieldForm onSubmit={jest.fn()} />);

    const input = screen.getByTestId("email");
    await user.click(input);
    await user.tab();

    expect(await screen.findByRole("alert")).toHaveTextContent("Email is required");
    expect(input).toHaveAttribute("aria-invalid", "true");
  });
});
