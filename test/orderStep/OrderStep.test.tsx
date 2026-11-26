import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { OrderStep } from "../../src/components/stepper-steps/orderStep/OrderStep";
import { initialState } from "../../src/components/stepper/reducer";

const props = {
  order: { quantity: 0, addons: [] as string[] },
  addons: initialState.addons,
  handleCheckBoxToggle: vi.fn(),
  handleTicketQuantity: vi.fn(),
  handleBlur: vi.fn(),
  touched: {
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    quantity: false,
  },
  errors: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    quantity: "",
  },
};

describe("OrderStep", () => {
  describe("quantity field", () => {
    it("should be empty when the quantity is 0", () => {
      //ARRANGE
      //ACT
      render(<OrderStep {...props} />);

      //ASSERT
      expect(screen.getByTestId("stepper-field-input")).toHaveDisplayValue("");
    });

    it("should show the quantity when it is above 0", () => {
      //ARRANGE
      //ACT
      render(<OrderStep {...props} order={{ quantity: 3, addons: [] }} />);

      //ASSERT
      expect(screen.getByTestId("stepper-field-input")).toHaveDisplayValue("3");
    });

    it("should show the quantity tooltip when hovering the field", async () => {
      //ARRANGE
      const user = userEvent.setup();
      render(<OrderStep {...props} />);
      const input = screen.getByTestId("stepper-field-input");

      //ACT
      await user.hover(input);

      //ASSERT
      const tooltip = await screen.findByTestId("order-quantity-tooltip");
      expect(tooltip).toHaveTextContent(
        "Please select a ticket quantity of 1 or more",
      );
    });

    it("should show the error when the field is touched and invalid", () => {
      //ARRANGE
      //ACT
      render(
        <OrderStep
          {...props}
          touched={{ ...props.touched, quantity: true }}
          errors={{ ...props.errors, quantity: "validation.quantity" }}
        />,
      );

      //ASSERT
      expect(screen.getByTestId("input-error")).toHaveTextContent(
        "Quantity must be at least 1",
      );
    });

    it("should not show the error when the field is untouched", () => {
      //ARRANGE
      //ACT
      render(
        <OrderStep
          {...props}
          errors={{ ...props.errors, quantity: "validation.quantity" }}
        />,
      );

      //ASSERT
      expect(screen.queryByTestId("input-error")).not.toBeInTheDocument();
    });
  });

  describe("user interactions", () => {
    it("should call the quantity handler once with the quantity field when typing", async () => {
      //ARRANGE
      const user = userEvent.setup();
      render(<OrderStep {...props} />);
      const input = screen.getByTestId("stepper-field-input");

      //ACT
      await user.type(input, "1");

      //ASSERT
      expect(props.handleTicketQuantity).toHaveBeenCalledTimes(1);
      expect(props.handleTicketQuantity.mock.calls[0][0].target.name).toBe(
        "quantity",
      );
    });

    it("should call the blur handler once with the quantity field when leaving it", async () => {
      //ARRANGE
      const user = userEvent.setup();
      render(<OrderStep {...props} />);
      const input = screen.getByTestId("stepper-field-input");
      await user.click(input);

      //ACT
      await user.tab();

      //ASSERT
      expect(props.handleBlur).toHaveBeenCalledTimes(1);
      expect(props.handleBlur.mock.calls[0][0].target.name).toBe("quantity");
    });

    it("should call the toggle handler once with the clicked add-on", async () => {
      //ARRANGE
      const user = userEvent.setup();
      render(<OrderStep {...props} />);
      const rows = screen.getAllByTestId("order-addon-row");

      //ACT
      await user.click(rows[2]);

      //ASSERT
      expect(props.handleCheckBoxToggle).toHaveBeenCalledTimes(1);
      expect(props.handleCheckBoxToggle.mock.calls[0][0].target.value).toBe(
        "glow-bracelet",
      );
    });
  });

  describe("add-ons", () => {
    it("should check only the chosen add-ons", () => {
      //ARRANGE
      //ACT
      render(
        <OrderStep
          {...props}
          order={{ quantity: 1, addons: ["vip-tent", "shuttle-pass"] }}
        />,
      );

      //ASSERT
      const checkboxes = screen.getAllByTestId("order-addon-checkbox");
      expect(checkboxes).toHaveLength(4);
      expect(checkboxes[0]).toBeChecked();
      expect(checkboxes[1]).not.toBeChecked();
      expect(checkboxes[2]).not.toBeChecked();
      expect(checkboxes[3]).toBeChecked();
    });
  });
});
