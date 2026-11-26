import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { PersonalInfoStep } from "../../src/components/stepper-steps/personalInfoStep/PersonalInfoStep";

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

describe("PersonalInfoStep", () => {
  describe("tooltips", () => {
    it("should show the first name tooltip when hovering the first name field", async () => {
      //ARRANGE
      const user = userEvent.setup();
      render(<PersonalInfoStep {...props} />);
      const inputs = screen.getAllByTestId("stepper-field-input");

      //ACT
      await user.hover(inputs[0]);

      //ASSERT
      const tooltip = await screen.findByTestId(
        "personal-info-first-name-tooltip",
      );
      expect(tooltip).toHaveTextContent("Please write your first name");
    });

    it("should show the last name tooltip when hovering the last name field", async () => {
      //ARRANGE
      const user = userEvent.setup();
      render(<PersonalInfoStep {...props} />);
      const inputs = screen.getAllByTestId("stepper-field-input");

      //ACT
      await user.hover(inputs[1]);

      //ASSERT
      const tooltip = await screen.findByTestId(
        "personal-info-last-name-tooltip",
      );
      expect(tooltip).toHaveTextContent("Please write your last name");
    });
  });

  describe("errors", () => {
    it("should show an error under each touched invalid field", () => {
      //ARRANGE
      //ACT
      render(
        <PersonalInfoStep
          {...props}
          touched={{ ...props.touched, firstName: true, lastName: true }}
          errors={{
            ...props.errors,
            firstName: "validation.firstName",
            lastName: "validation.lastName",
          }}
        />,
      );

      //ASSERT
      const errors = screen.getAllByTestId("input-error");
      expect(errors).toHaveLength(2);
      expect(errors[0]).toHaveTextContent(
        "First name must be at least 3 characters",
      );
      expect(errors[1]).toHaveTextContent(
        "Last name must be at least 3 characters",
      );
    });

    it("should not show errors when the fields are untouched", () => {
      //ARRANGE
      //ACT
      render(
        <PersonalInfoStep
          {...props}
          errors={{
            ...props.errors,
            firstName: "validation.firstName",
            lastName: "validation.lastName",
          }}
        />,
      );

      //ASSERT
      expect(screen.queryByTestId("input-error")).not.toBeInTheDocument();
    });
  });

  describe("user interactions", () => {
    it("should call the change handler once with the last name field when typing in it", async () => {
      //ARRANGE
      const user = userEvent.setup();
      render(<PersonalInfoStep {...props} />);
      const inputs = screen.getAllByTestId("stepper-field-input");

      //ACT
      await user.type(inputs[1], "a");

      //ASSERT
      expect(props.handleInputChange).toHaveBeenCalledTimes(1);
      expect(props.handleInputChange.mock.calls[0][0].target.name).toBe(
        "lastName",
      );
    });

    it("should call the blur handler once with the first name field when leaving it", async () => {
      //ARRANGE
      const user = userEvent.setup();
      render(<PersonalInfoStep {...props} />);
      const inputs = screen.getAllByTestId("stepper-field-input");
      await user.click(inputs[0]);

      //ACT
      await user.tab();

      //ASSERT
      expect(props.handleBlur).toHaveBeenCalledTimes(1);
      expect(props.handleBlur.mock.calls[0][0].target.name).toBe("firstName");
    });
  });
});
