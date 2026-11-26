import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { toast } from "react-toastify";
import { Stepper } from "../../src/components/stepper/Stepper";
import { HomePage } from "../../src/components/homePage/HomePage";

vi.mock("react-toastify", () => ({
  toast: { success: vi.fn() },
  Bounce: {},
  ToastContainer: () => null,
}));

const stepper = (
  <MemoryRouter initialEntries={["/booking"]}>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/booking" element={<Stepper />} />
    </Routes>
  </MemoryRouter>
);

describe("Stepper", () => {
  describe("validation", () => {
    it("should show the error and the red border when an invalid field is left", async () => {
      //ARRANGE
      const user = userEvent.setup();
      render(stepper);
      const inputs = screen.getAllByTestId("stepper-field-input");
      await user.click(inputs[0]);

      //ACT
      await user.tab();

      //ASSERT
      expect(screen.getByTestId("input-error")).toHaveTextContent(
        "First name must be at least 3 characters",
      );
      expect(
        screen.getByTestId("stepper-field-error-icon"),
      ).toBeInTheDocument();
      expect(inputs[0]).toHaveStyle("border: 1px solid #dc2626");
    });

    it("should remove the error and show the success border when the value is fixed", async () => {
      //ARRANGE
      const user = userEvent.setup();
      render(stepper);
      const inputs = screen.getAllByTestId("stepper-field-input");
      await user.click(inputs[0]);
      await user.click(document.body);

      //ACT
      await user.type(inputs[0], "Adam");

      //ASSERT
      expect(screen.queryByTestId("input-error")).not.toBeInTheDocument();
      expect(
        screen.queryByTestId("stepper-field-error-icon"),
      ).not.toBeInTheDocument();
      expect(
        screen.getByTestId("stepper-field-success-icon"),
      ).toBeInTheDocument();
      expect(inputs[0]).toHaveStyle("border: 1px solid #7c3aed");
    });

    it("should keep Next disabled while the names are empty or invalid and enable it once both are valid", async () => {
      //ARRANGE
      const user = userEvent.setup();
      render(stepper);
      const inputs = screen.getAllByTestId("stepper-field-input");
      expect(screen.getByTestId("stepper-button")).toBeDisabled();
      await user.type(inputs[0], "Ad");
      await user.type(inputs[1], "Hoffmann");
      expect(screen.getByTestId("stepper-button")).toBeDisabled();

      //ACT
      await user.type(inputs[0], "am");

      //ASSERT
      expect(screen.getByTestId("stepper-button")).toBeEnabled();
    });

    it("should show the step 1 tooltip when hovering the disabled Next", async () => {
      //ARRANGE
      const user = userEvent.setup();
      render(stepper);
      const next = screen.getByTestId("stepper-button");

      //ACT
      await user.hover(next);

      //ASSERT
      expect(
        await screen.findByTestId("next-button-tooltip"),
      ).toHaveTextContent("Please fill in your first name and last name");
    });

    it("should show the step 2 tooltip when hovering the disabled Next", async () => {
      //ARRANGE
      const user = userEvent.setup();
      render(stepper);
      const nameInputs = screen.getAllByTestId("stepper-field-input");
      await user.type(nameInputs[0], "Adam");
      await user.type(nameInputs[1], "Hoffmann");
      await user.click(screen.getByTestId("stepper-button"));

      //ACT
      await user.hover(screen.getAllByTestId("stepper-button")[1]);

      //ASSERT
      expect(
        await screen.findByTestId("next-button-tooltip"),
      ).toHaveTextContent("Please fill in a valid email and phone number");
    });
  });

  describe("navigation", () => {
    it("should move the progress bar to the current step", async () => {
      //ARRANGE
      const user = userEvent.setup();
      render(stepper);
      const nameInputs = screen.getAllByTestId("stepper-field-input");
      await user.type(nameInputs[0], "Adam");
      await user.type(nameInputs[1], "Hoffmann");
      await user.click(screen.getByTestId("stepper-button"));
      const contactInputs = screen.getAllByTestId("stepper-field-input");
      await user.type(contactInputs[0], "adam@example.com");
      await user.type(contactInputs[1], "+49 170 1234567");

      //ACT
      await user.click(screen.getAllByTestId("stepper-button")[1]);

      //ASSERT
      const circles = screen.getAllByTestId("progress-bar-circle");
      expect(circles[0]).toHaveStyle("border: 1px solid #ffffff");
      expect(circles[1]).toHaveStyle("border: 1px solid #ffffff");
      expect(circles[2]).toHaveStyle("border: 1px solid #7c3aed");
      expect(circles[3]).toHaveStyle("border: 1px solid #333333");
    });

    it("should stay on step 1 when the disabled Next is clicked", async () => {
      //ARRANGE
      const user = userEvent.setup();
      render(stepper);
      const next = screen.getByTestId("stepper-button");

      //ACT
      await user.click(next);

      //ASSERT
      const circles = screen.getAllByTestId("progress-bar-circle");
      expect(circles[0]).toHaveStyle("border: 1px solid #7c3aed");
      expect(circles[1]).toHaveStyle("border: 1px solid #333333");
      expect(screen.getAllByTestId("stepper-button")).toHaveLength(1);
    });

    it("should keep all values and enable Next when going back with Previous", async () => {
      //ARRANGE
      const user = userEvent.setup();
      render(stepper);
      const nameInputs = screen.getAllByTestId("stepper-field-input");
      await user.type(nameInputs[0], "Adam");
      await user.type(nameInputs[1], "Hoffmann");
      await user.click(screen.getByTestId("stepper-button"));
      const contactInputs = screen.getAllByTestId("stepper-field-input");
      await user.type(contactInputs[0], "adam@example.com");
      await user.type(contactInputs[1], "+49 170 1234567");

      //ACT
      await user.click(screen.getAllByTestId("stepper-button")[0]);

      //ASSERT
      const restoredInputs = screen.getAllByTestId("stepper-field-input");
      expect(restoredInputs[0]).toHaveDisplayValue("Adam");
      expect(restoredInputs[1]).toHaveDisplayValue("Hoffmann");
      expect(screen.getByTestId("stepper-button")).toBeEnabled();
    });

    it("should validate an edited value and leave the other field untouched", async () => {
      //ARRANGE
      const user = userEvent.setup();
      render(stepper);
      const nameInputs = screen.getAllByTestId("stepper-field-input");
      await user.type(nameInputs[0], "Adam");
      await user.type(nameInputs[1], "Hoffmann");
      await user.click(screen.getByTestId("stepper-button"));
      const contactInputs = screen.getAllByTestId("stepper-field-input");
      await user.type(contactInputs[0], "adam@example.com");
      await user.type(contactInputs[1], "+49 170 1234567");
      await user.click(screen.getAllByTestId("stepper-button")[0]);
      const editInputs = screen.getAllByTestId("stepper-field-input");

      //ACT
      await user.type(editInputs[0], "{backspace}{backspace}");

      //ASSERT
      expect(screen.getAllByTestId("input-error")).toHaveLength(1);
      expect(screen.getByTestId("input-error")).toHaveTextContent(
        "First name must be at least 3 characters",
      );
      expect(editInputs[1]).toHaveDisplayValue("Hoffmann");
      expect(screen.getByTestId("stepper-button")).toBeDisabled();
    });
  });

  describe("event step", () => {
    it("should show only the passes of the selected event", async () => {
      //ARRANGE
      const user = userEvent.setup();
      render(stepper);
      const nameInputs = screen.getAllByTestId("stepper-field-input");
      await user.type(nameInputs[0], "Adam");
      await user.type(nameInputs[1], "Hoffmann");
      await user.click(screen.getByTestId("stepper-button"));
      const contactInputs = screen.getAllByTestId("stepper-field-input");
      await user.type(contactInputs[0], "adam@example.com");
      await user.type(contactInputs[1], "+49 170 1234567");
      await user.click(screen.getAllByTestId("stepper-button")[1]);
      const cards = screen.getAllByTestId("event-tier-card");

      //ACT
      await user.click(cards[0]);

      //ASSERT
      const passes = screen.getAllByTestId("event-tier-pass");
      expect(passes).toHaveLength(3);
      expect(passes[0]).toHaveTextContent("Day Pass");
      expect(passes[1]).toHaveTextContent("Weekend Pass");
      expect(passes[2]).toHaveTextContent("VIP Experience");
    });

    it("should hide the passes when the selected event is clicked again", async () => {
      //ARRANGE
      const user = userEvent.setup();
      render(stepper);
      const nameInputs = screen.getAllByTestId("stepper-field-input");
      await user.type(nameInputs[0], "Adam");
      await user.type(nameInputs[1], "Hoffmann");
      await user.click(screen.getByTestId("stepper-button"));
      const contactInputs = screen.getAllByTestId("stepper-field-input");
      await user.type(contactInputs[0], "adam@example.com");
      await user.type(contactInputs[1], "+49 170 1234567");
      await user.click(screen.getAllByTestId("stepper-button")[1]);
      const cards = screen.getAllByTestId("event-tier-card");
      await user.click(cards[0]);

      //ACT
      await user.click(cards[0]);

      //ASSERT
      expect(screen.queryAllByTestId("event-tier-pass")).toHaveLength(0);
    });

    it("should show the passes of another event and disable Next because the old pass is cleared", async () => {
      //ARRANGE
      const user = userEvent.setup();
      render(stepper);
      const nameInputs = screen.getAllByTestId("stepper-field-input");
      await user.type(nameInputs[0], "Adam");
      await user.type(nameInputs[1], "Hoffmann");
      await user.click(screen.getByTestId("stepper-button"));
      const contactInputs = screen.getAllByTestId("stepper-field-input");
      await user.type(contactInputs[0], "adam@example.com");
      await user.type(contactInputs[1], "+49 170 1234567");
      await user.click(screen.getAllByTestId("stepper-button")[1]);
      const cards = screen.getAllByTestId("event-tier-card");
      await user.click(cards[0]);
      await user.click(screen.getAllByTestId("event-tier-pass")[0]);

      //ACT
      await user.click(cards[1]);

      //ASSERT
      const passes = screen.getAllByTestId("event-tier-pass");
      expect(passes).toHaveLength(2);
      expect(passes[0]).toHaveTextContent("General Admission");
      expect(passes[1]).toHaveTextContent("Premium");
      expect(screen.getAllByTestId("stepper-button")[1]).toBeDisabled();
    });

    it("should disable Next with the step 3 tooltip when an event is selected without a pass", async () => {
      //ARRANGE
      const user = userEvent.setup();
      render(stepper);
      const nameInputs = screen.getAllByTestId("stepper-field-input");
      await user.type(nameInputs[0], "Adam");
      await user.type(nameInputs[1], "Hoffmann");
      await user.click(screen.getByTestId("stepper-button"));
      const contactInputs = screen.getAllByTestId("stepper-field-input");
      await user.type(contactInputs[0], "adam@example.com");
      await user.type(contactInputs[1], "+49 170 1234567");
      await user.click(screen.getAllByTestId("stepper-button")[1]);
      await user.click(screen.getAllByTestId("event-tier-card")[0]);

      //ACT
      await user.hover(screen.getAllByTestId("stepper-button")[1]);

      //ASSERT
      expect(screen.getAllByTestId("stepper-button")[1]).toBeDisabled();
      expect(
        await screen.findByTestId("next-button-tooltip"),
      ).toHaveTextContent("Please select an event and a ticket tier");
    });

    it("should enable Next when an event and a pass are selected", async () => {
      //ARRANGE
      const user = userEvent.setup();
      render(stepper);
      const nameInputs = screen.getAllByTestId("stepper-field-input");
      await user.type(nameInputs[0], "Adam");
      await user.type(nameInputs[1], "Hoffmann");
      await user.click(screen.getByTestId("stepper-button"));
      const contactInputs = screen.getAllByTestId("stepper-field-input");
      await user.type(contactInputs[0], "adam@example.com");
      await user.type(contactInputs[1], "+49 170 1234567");
      await user.click(screen.getAllByTestId("stepper-button")[1]);
      await user.click(screen.getAllByTestId("event-tier-card")[0]);

      //ACT
      await user.click(screen.getAllByTestId("event-tier-pass")[0]);

      //ASSERT
      expect(screen.getAllByTestId("stepper-button")[1]).toBeEnabled();
    });

    it("should keep Next enabled and move the selection when another pass of the same event is picked", async () => {
      //ARRANGE
      const user = userEvent.setup();
      render(stepper);
      const nameInputs = screen.getAllByTestId("stepper-field-input");
      await user.type(nameInputs[0], "Adam");
      await user.type(nameInputs[1], "Hoffmann");
      await user.click(screen.getByTestId("stepper-button"));
      const contactInputs = screen.getAllByTestId("stepper-field-input");
      await user.type(contactInputs[0], "adam@example.com");
      await user.type(contactInputs[1], "+49 170 1234567");
      await user.click(screen.getAllByTestId("stepper-button")[1]);
      await user.click(screen.getAllByTestId("event-tier-card")[0]);
      const passes = screen.getAllByTestId("event-tier-pass");
      await user.click(passes[0]);

      //ACT
      await user.click(passes[1]);

      //ASSERT
      expect(screen.getAllByTestId("stepper-button")[1]).toBeEnabled();
      expect(passes[0]).toHaveStyle("border: 1px solid #222222");
      expect(passes[1]).toHaveStyle("border: 1px solid #7c3aed");
    });
  });

  describe("order step", () => {
    it("should show Checkout instead of Next on step 4", async () => {
      //ARRANGE
      const user = userEvent.setup();
      render(stepper);
      const nameInputs = screen.getAllByTestId("stepper-field-input");
      await user.type(nameInputs[0], "Adam");
      await user.type(nameInputs[1], "Hoffmann");
      await user.click(screen.getByTestId("stepper-button"));
      const contactInputs = screen.getAllByTestId("stepper-field-input");
      await user.type(contactInputs[0], "adam@example.com");
      await user.type(contactInputs[1], "+49 170 1234567");
      await user.click(screen.getAllByTestId("stepper-button")[1]);
      await user.click(screen.getAllByTestId("event-tier-card")[0]);
      await user.click(screen.getAllByTestId("event-tier-pass")[1]);

      //ACT
      await user.click(screen.getAllByTestId("stepper-button")[1]);

      //ASSERT
      expect(screen.getAllByTestId("stepper-button")[1]).toHaveTextContent(
        "Checkout",
      );
      expect(screen.queryByText("Next")).not.toBeInTheDocument();
    });

    it("should keep Checkout disabled with its tooltip when the quantity exceeds the spots left", async () => {
      //ARRANGE
      const user = userEvent.setup();
      render(stepper);
      const nameInputs = screen.getAllByTestId("stepper-field-input");
      await user.type(nameInputs[0], "Adam");
      await user.type(nameInputs[1], "Hoffmann");
      await user.click(screen.getByTestId("stepper-button"));
      const contactInputs = screen.getAllByTestId("stepper-field-input");
      await user.type(contactInputs[0], "adam@example.com");
      await user.type(contactInputs[1], "+49 170 1234567");
      await user.click(screen.getAllByTestId("stepper-button")[1]);
      await user.click(screen.getAllByTestId("event-tier-card")[2]);
      await user.click(screen.getAllByTestId("event-tier-pass")[1]);
      await user.click(screen.getAllByTestId("stepper-button")[1]);
      await user.type(screen.getByTestId("stepper-field-input"), "30");
      await user.click(document.body);

      //ACT
      await user.hover(screen.getAllByTestId("stepper-button")[1]);

      //ASSERT
      expect(screen.getAllByTestId("stepper-button")[1]).toBeDisabled();
      expect(screen.getByTestId("input-error")).toHaveTextContent(
        "Not enough spots left for this quantity",
      );
      expect(
        await screen.findByTestId("stepper-checkout-tooltip"),
      ).toHaveTextContent("Please select a ticket quantity of 1 or more");
    });

    it("should enable Checkout without any add-on once the quantity is valid", async () => {
      //ARRANGE
      const user = userEvent.setup();
      render(stepper);
      const nameInputs = screen.getAllByTestId("stepper-field-input");
      await user.type(nameInputs[0], "Adam");
      await user.type(nameInputs[1], "Hoffmann");
      await user.click(screen.getByTestId("stepper-button"));
      const contactInputs = screen.getAllByTestId("stepper-field-input");
      await user.type(contactInputs[0], "adam@example.com");
      await user.type(contactInputs[1], "+49 170 1234567");
      await user.click(screen.getAllByTestId("stepper-button")[1]);
      await user.click(screen.getAllByTestId("event-tier-card")[0]);
      await user.click(screen.getAllByTestId("event-tier-pass")[1]);
      await user.click(screen.getAllByTestId("stepper-button")[1]);

      //ACT
      await user.type(screen.getByTestId("stepper-field-input"), "2");

      //ASSERT
      expect(screen.getAllByTestId("stepper-button")[1]).toBeEnabled();
      screen.getAllByTestId("order-addon-checkbox").forEach((checkbox) => {
        expect(checkbox).not.toBeChecked();
      });
    });
  });

  describe("checkout", () => {
    it("should open the modal with all the entered info", async () => {
      //ARRANGE
      const user = userEvent.setup();
      render(stepper);
      const nameInputs = screen.getAllByTestId("stepper-field-input");
      await user.type(nameInputs[0], "Adam");
      await user.type(nameInputs[1], "Hoffmann");
      await user.click(screen.getByTestId("stepper-button"));
      const contactInputs = screen.getAllByTestId("stepper-field-input");
      await user.type(contactInputs[0], "adam@example.com");
      await user.type(contactInputs[1], "+49 170 1234567");
      await user.click(screen.getAllByTestId("stepper-button")[1]);
      await user.click(screen.getAllByTestId("event-tier-card")[0]);
      await user.click(screen.getAllByTestId("event-tier-pass")[1]);
      await user.click(screen.getAllByTestId("stepper-button")[1]);
      await user.type(screen.getByTestId("stepper-field-input"), "2");

      //ACT
      await user.click(screen.getAllByTestId("stepper-button")[1]);

      //ASSERT
      expect(screen.getByTestId("checkout-modal")).toBeInTheDocument();
      expect(screen.getByTestId("booking-summary-name")).toHaveTextContent(
        "Adam Hoffmann",
      );
      expect(screen.getByTestId("booking-summary-email")).toHaveTextContent(
        "adam@example.com",
      );
      expect(screen.getByTestId("booking-summary-phone")).toHaveTextContent(
        "+49 170 1234567",
      );
      expect(screen.getByTestId("booking-summary-event")).toHaveTextContent(
        "Awakenings Festival",
      );
      expect(screen.getByTestId("booking-summary-dates")).toHaveTextContent(
        "Jul 10 - Jul 12",
      );
      expect(screen.getByTestId("booking-summary-tier")).toHaveTextContent(
        "Weekend Pass",
      );
      expect(
        screen.getByTestId("booking-summary-tier-price"),
      ).toHaveTextContent("€229.00");
      expect(screen.getByTestId("booking-summary-quantity")).toHaveTextContent(
        "2",
      );
      expect(screen.getByTestId("booking-summary-total")).toHaveTextContent(
        "€458.00",
      );
    });

    it("should show no add-ons in the modal when none are chosen", async () => {
      //ARRANGE
      const user = userEvent.setup();
      render(stepper);
      const nameInputs = screen.getAllByTestId("stepper-field-input");
      await user.type(nameInputs[0], "Adam");
      await user.type(nameInputs[1], "Hoffmann");
      await user.click(screen.getByTestId("stepper-button"));
      const contactInputs = screen.getAllByTestId("stepper-field-input");
      await user.type(contactInputs[0], "adam@example.com");
      await user.type(contactInputs[1], "+49 170 1234567");
      await user.click(screen.getAllByTestId("stepper-button")[1]);
      await user.click(screen.getAllByTestId("event-tier-card")[0]);
      await user.click(screen.getAllByTestId("event-tier-pass")[1]);
      await user.click(screen.getAllByTestId("stepper-button")[1]);
      await user.type(screen.getByTestId("stepper-field-input"), "2");

      //ACT
      await user.click(screen.getAllByTestId("stepper-button")[1]);

      //ASSERT
      expect(screen.getByTestId("checkout-modal")).toBeInTheDocument();
      expect(
        screen.queryByTestId("booking-summary-addon"),
      ).not.toBeInTheDocument();
    });

    it("should show the chosen add-ons and the correct total in the modal", async () => {
      //ARRANGE
      const user = userEvent.setup();
      render(stepper);
      const nameInputs = screen.getAllByTestId("stepper-field-input");
      await user.type(nameInputs[0], "Adam");
      await user.type(nameInputs[1], "Hoffmann");
      await user.click(screen.getByTestId("stepper-button"));
      const contactInputs = screen.getAllByTestId("stepper-field-input");
      await user.type(contactInputs[0], "adam@example.com");
      await user.type(contactInputs[1], "+49 170 1234567");
      await user.click(screen.getAllByTestId("stepper-button")[1]);
      await user.click(screen.getAllByTestId("event-tier-card")[0]);
      await user.click(screen.getAllByTestId("event-tier-pass")[1]);
      await user.click(screen.getAllByTestId("stepper-button")[1]);
      await user.type(screen.getByTestId("stepper-field-input"), "2");
      const rows = screen.getAllByTestId("order-addon-row");
      await user.click(rows[0]);
      await user.click(rows[3]);

      //ACT
      await user.click(screen.getAllByTestId("stepper-button")[1]);

      //ASSERT
      const addonRows = screen.getAllByTestId("booking-summary-addon");
      expect(addonRows).toHaveLength(2);
      expect(addonRows[0]).toHaveTextContent("VIP Tent Access");
      expect(addonRows[1]).toHaveTextContent("Shuttle Pass");
      expect(screen.getByTestId("booking-summary-total")).toHaveTextContent(
        "€523.00",
      );
    });

    it("should close the modal when Cancel is clicked", async () => {
      //ARRANGE
      const user = userEvent.setup();
      render(stepper);
      const nameInputs = screen.getAllByTestId("stepper-field-input");
      await user.type(nameInputs[0], "Adam");
      await user.type(nameInputs[1], "Hoffmann");
      await user.click(screen.getByTestId("stepper-button"));
      const contactInputs = screen.getAllByTestId("stepper-field-input");
      await user.type(contactInputs[0], "adam@example.com");
      await user.type(contactInputs[1], "+49 170 1234567");
      await user.click(screen.getAllByTestId("stepper-button")[1]);
      await user.click(screen.getAllByTestId("event-tier-card")[0]);
      await user.click(screen.getAllByTestId("event-tier-pass")[1]);
      await user.click(screen.getAllByTestId("stepper-button")[1]);
      await user.type(screen.getByTestId("stepper-field-input"), "2");
      await user.click(screen.getAllByTestId("stepper-button")[1]);

      //ACT
      await user.click(screen.getAllByTestId("stepper-button")[2]);

      //ASSERT
      expect(screen.queryByTestId("checkout-modal")).not.toBeInTheDocument();
      expect(screen.getByTestId("stepper-field-input")).toHaveDisplayValue("2");
    });

    it("should show the success toast and the confirmation screen with a booking ID when Confirm is clicked", async () => {
      //ARRANGE
      const user = userEvent.setup();
      render(stepper);
      const nameInputs = screen.getAllByTestId("stepper-field-input");
      await user.type(nameInputs[0], "Adam");
      await user.type(nameInputs[1], "Hoffmann");
      await user.click(screen.getByTestId("stepper-button"));
      const contactInputs = screen.getAllByTestId("stepper-field-input");
      await user.type(contactInputs[0], "adam@example.com");
      await user.type(contactInputs[1], "+49 170 1234567");
      await user.click(screen.getAllByTestId("stepper-button")[1]);
      await user.click(screen.getAllByTestId("event-tier-card")[0]);
      await user.click(screen.getAllByTestId("event-tier-pass")[1]);
      await user.click(screen.getAllByTestId("stepper-button")[1]);
      await user.type(screen.getByTestId("stepper-field-input"), "2");
      await user.click(screen.getAllByTestId("stepper-button")[1]);

      //ACT
      await user.click(screen.getAllByTestId("stepper-button")[3]);

      //ASSERT
      expect(toast.success).toHaveBeenCalledTimes(1);
      expect(screen.queryByTestId("checkout-modal")).not.toBeInTheDocument();
      expect(screen.getByTestId("confirmation-booking-id").textContent).toMatch(
        /^VLT-[0-9A-F]{8}$/,
      );
      expect(screen.getByTestId("confirmation-name")).toHaveTextContent(
        "Adam Hoffmann",
      );
      expect(screen.getByTestId("confirmation-total")).toHaveTextContent(
        "€458.00",
      );
    });

    it("should return to the home page when Go Back Home is clicked", async () => {
      //ARRANGE
      const user = userEvent.setup();
      render(stepper);
      const nameInputs = screen.getAllByTestId("stepper-field-input");
      await user.type(nameInputs[0], "Adam");
      await user.type(nameInputs[1], "Hoffmann");
      await user.click(screen.getByTestId("stepper-button"));
      const contactInputs = screen.getAllByTestId("stepper-field-input");
      await user.type(contactInputs[0], "adam@example.com");
      await user.type(contactInputs[1], "+49 170 1234567");
      await user.click(screen.getAllByTestId("stepper-button")[1]);
      await user.click(screen.getAllByTestId("event-tier-card")[0]);
      await user.click(screen.getAllByTestId("event-tier-pass")[1]);
      await user.click(screen.getAllByTestId("stepper-button")[1]);
      await user.type(screen.getByTestId("stepper-field-input"), "2");
      await user.click(screen.getAllByTestId("stepper-button")[1]);
      await user.click(screen.getAllByTestId("stepper-button")[3]);

      //ACT
      await user.click(screen.getByTestId("stepper-button"));

      //ASSERT
      expect(screen.getByTestId("home-book-now")).toBeInTheDocument();
      expect(
        screen.queryByTestId("confirmation-booking-id"),
      ).not.toBeInTheDocument();
    });
  });
});
