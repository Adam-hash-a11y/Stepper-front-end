import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ConfirmationScreen } from "../../src/components/confirmationScreen/ConfirmationScreen";
import { initialState } from "../../src/components/stepper/reducer";

const props = {
  attendee: {
    firstName: "Adam",
    lastName: "Hoffmann",
    email: "adam@example.com",
    phone: "+49 170 1234567",
  },
  events: initialState.events,
  addons: initialState.addons,
  selection: { eventId: "timewarp-2026", tierId: "premium" },
  order: { quantity: 3, addons: [] as string[] },
  totalPrice: 747,
  bookingId: "VLT-1A2B3C4D",
  handleStartOver: vi.fn(),
};

describe("ConfirmationScreen", () => {
  describe("booking details", () => {
    it("should show the booking ID", () => {
      //ARRANGE
      //ACT
      render(<ConfirmationScreen {...props} />);

      //ASSERT
      expect(screen.getByTestId("confirmation-booking-id")).toHaveTextContent(
        "VLT-1A2B3C4D",
      );
    });

    it("should show the attendee name, email and phone", () => {
      //ARRANGE
      //ACT
      render(<ConfirmationScreen {...props} />);

      //ASSERT
      expect(screen.getByTestId("confirmation-name")).toHaveTextContent(
        "Adam Hoffmann",
      );
      expect(screen.getByTestId("confirmation-email")).toHaveTextContent(
        "adam@example.com",
      );
      expect(screen.getByTestId("confirmation-phone")).toHaveTextContent(
        "+49 170 1234567",
      );
    });

    it("should show the event, dates, tier, tier price and quantity of the selection", () => {
      //ARRANGE
      //ACT
      render(<ConfirmationScreen {...props} />);

      //ASSERT
      expect(screen.getByTestId("confirmation-event")).toHaveTextContent(
        "Time Warp",
      );
      expect(screen.getByTestId("confirmation-dates")).toHaveTextContent(
        "Apr 04 - Apr 05",
      );
      expect(screen.getByTestId("confirmation-tier")).toHaveTextContent(
        "Premium",
      );
      expect(screen.getByTestId("confirmation-tier-price")).toHaveTextContent(
        "€249.00",
      );
      expect(screen.getByTestId("confirmation-quantity")).toHaveTextContent(
        "3",
      );
    });
  });

  describe("add-ons", () => {
    it("should show the chosen add-ons with their prices", () => {
      //ARRANGE
      //ACT
      render(
        <ConfirmationScreen
          {...props}
          order={{ quantity: 3, addons: ["festival-tattoo", "shuttle-pass"] }}
        />,
      );

      //ASSERT
      const rows = screen.getAllByTestId("confirmation-addon");
      expect(rows).toHaveLength(2);
      expect(rows[0]).toHaveTextContent("Festival Tattoo");
      expect(rows[0]).toHaveTextContent("€25.00");
      expect(rows[1]).toHaveTextContent("Shuttle Pass");
      expect(rows[1]).toHaveTextContent("€20.00");
    });

    it("should show no add-ons when none are chosen", () => {
      //ARRANGE
      //ACT
      render(<ConfirmationScreen {...props} />);

      //ASSERT
      expect(
        screen.queryByTestId("confirmation-addon"),
      ).not.toBeInTheDocument();
      expect(screen.queryByText("Add-Ons")).not.toBeInTheDocument();
    });
  });

  describe("total and navigation", () => {
    it("should show the total paid it receives", () => {
      //ARRANGE
      //ACT
      render(<ConfirmationScreen {...props} />);

      //ASSERT
      expect(screen.getByTestId("confirmation-total")).toHaveTextContent(
        "€747.00",
      );
    });

    it("should call the start over handler once when Go Back Home is clicked", async () => {
      //ARRANGE
      const user = userEvent.setup();
      render(<ConfirmationScreen {...props} />);
      const button = screen.getByTestId("stepper-button");

      //ACT
      await user.click(button);

      //ASSERT
      expect(props.handleStartOver).toHaveBeenCalledTimes(1);
    });
  });
});
