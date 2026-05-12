import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Switch } from "../Switch";
import { FormControl } from "../../Form/FormControl";

describe("Switch", () => {
  it("toggles with role switch", () => {
    render(<Switch defaultChecked={false}>Wi-Fi</Switch>);
    const sw = screen.getByRole("switch", { name: /wi-fi/i }) as HTMLInputElement;
    expect(sw.checked).toBe(false);
    fireEvent.click(sw);
    expect(sw.checked).toBe(true);
    expect(sw).toHaveAttribute("aria-checked", "true");
  });

  it("inherits disabled from FormControl", () => {
    render(
      <FormControl isDisabled>
        <Switch>Notifications</Switch>
      </FormControl>,
    );
    expect(screen.getByRole("switch")).toBeDisabled();
  });
});
