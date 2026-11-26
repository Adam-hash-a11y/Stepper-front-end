import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { ContactStep } from "../../src/components/stepper-steps/contactStep/ContactStep";

const props = {
  attendee: { firstName: "", lastName: "", email: "", phone: "" },
  handleInputChange: vi.fn(),
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

describe("ContactStep", () => {
  describe("tooltips", () => {
    it("should show the email tooltip when hovering the email field", async () => {
      //ARRANGE
      const user = userEvent.setup();
      render(<ContactStep {...props} />);
      const inputs = screen.getAllByTestId("stepper-field-input");

      //ACT
      await user.hover(inputs[0]);

      //ASSERT
      const tooltip = await screen.findByTestId("contact-email-tooltip");
      expect(tooltip).toHaveTextContent("Please write your email");
    });

    it("should show the phone tooltip when hovering the phone field", async () => {
      //ARRANGE
      const user = userEvent.setup();
      render(<ContactStep {...props} />);
      const inputs = screen.getAllByTestId("stepper-field-input");

      //ACT
      await user.hover(inputs[1]);

      //ASSERT
      const tooltip = await screen.findByTestId("contact-phone-tooltip");
      expect(tooltip).toHaveTextContent("Please write your phone number");
    });
  });

  describe("errors", () => {
    it("should show an error under each touched invalid field", () => {
      //ARRANGE
      //ACT
      render(
        <ContactStep
          {...props}
          touched={{ ...props.touched, email: true, phone: true }}
          errors={{
            ...props.errors,
            email: "validation.email",
            phone: "validation.phone",
          }}
        />,
      );

      //ASSERT
      const errors = screen.getAllByTestId("input-error");
      expect(errors).toHaveLength(2);
      expect(errors[0]).toHaveTextContent("Email must be valid");
      expect(errors[1]).toHaveTextContent(
        "Phone number must have at least 8 digits",
      );
    });

    it("should not show errors when the fields are untouched", () => {
      //ARRANGE
      //ACT
      render(
        <ContactStep
          {...props}
          errors={{
            ...props.errors,
            email: "validation.email",
            phone: "validation.phone",
          }}
        />,
      );

      //ASSERT
      expect(screen.queryByTestId("input-error")).not.toBeInTheDocument();
    });
  });

  describe("user interactions", () => {
    it("should call the change handler once with the phone field when typing in it", async () => {
      //ARRANGE
      const user = userEvent.setup();
      render(<ContactStep {...props} />);
      const inputs = screen.getAllByTestId("stepper-field-input");

      //ACT
      await user.type(inputs[1], "1");

      //ASSERT
      expect(props.handleInputChange).toHaveBeenCalledTimes(1);
      expect(props.handleInputChange.mock.calls[0][0].target.name).toBe(
        "phone",
      );
    });

    it("should call the blur handler once with the email field when leaving it", async () => {
      //ARRANGE
      const user = userEvent.setup();
      render(<ContactStep {...props} />);
      const inputs = screen.getAllByTestId("stepper-field-input");
      await user.click(inputs[0]);

      //ACT
      await user.tab();

      //ASSERT
      expect(props.handleBlur).toHaveBeenCalledTimes(1);
      expect(props.handleBlur.mock.calls[0][0].target.name).toBe("email");
    });
  });
});
