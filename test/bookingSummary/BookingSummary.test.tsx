import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { BookingSummary } from "../../src/components/bookingSummary/BookingSummary";
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
  selection: { eventId: "awakenings-2026", tierId: "weekend" },
  order: { quantity: 2, addons: [] as string[] },
  handleValidate: vi.fn(),
  handleClose: vi.fn(),
};

describe("BookingSummary", () => {
  describe("attendee and order details", () => {
    it("should show the attendee name, email and phone", () => {
      //ARRANGE
      //ACT
      render(<BookingSummary {...props} />);

      //ASSERT
      expect(screen.getByTestId("booking-summary-name")).toHaveTextContent(
        "Adam Hoffmann",
      );
      expect(screen.getByTestId("booking-summary-email")).toHaveTextContent(
        "adam@example.com",
      );
      expect(screen.getByTestId("booking-summary-phone")).toHaveTextContent(
        "+49 170 1234567",
      );
    });

    it("should show the event, dates, tier, tier price and quantity of the selection", () => {
      //ARRANGE
      //ACT
      render(<BookingSummary {...props} />);

      //ASSERT
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
    });
  });

  describe("add-ons", () => {
    it("should show the chosen add-ons with their prices", () => {
      //ARRANGE
      //ACT
      render(
        <BookingSummary
          {...props}
          order={{ quantity: 2, addons: ["vip-tent", "glow-bracelet"] }}
        />,
      );

      //ASSERT
      const rows = screen.getAllByTestId("booking-summary-addon");
      expect(rows).toHaveLength(2);
      expect(rows[0]).toHaveTextContent("VIP Tent Access");
      expect(rows[0]).toHaveTextContent("€45.00");
      expect(rows[1]).toHaveTextContent("LED Glow Bracelet");
      expect(rows[1]).toHaveTextContent("€15.00");
    });

    it("should show no add-ons when none are chosen", () => {
      //ARRANGE
      //ACT
      render(<BookingSummary {...props} />);

      //ASSERT
      expect(
        screen.queryByTestId("booking-summary-addon"),
      ).not.toBeInTheDocument();
      expect(screen.queryByText("Add-Ons")).not.toBeInTheDocument();
    });
  });

  describe("total", () => {
    it("should be the tier price times the quantity plus each add-on once", () => {
      //ARRANGE
      //ACT
      render(
        <BookingSummary
          {...props}
          order={{ quantity: 2, addons: ["vip-tent", "shuttle-pass"] }}
        />,
      );

      //ASSERT
      expect(screen.getByTestId("booking-summary-total")).toHaveTextContent(
        "€523.00",
      );
    });
  });

  describe("user interactions", () => {
    it("should call the close handler once when Cancel is clicked", async () => {
      //ARRANGE
      const user = userEvent.setup();
      render(<BookingSummary {...props} />);
      const buttons = screen.getAllByTestId("stepper-button");

      //ACT
      await user.click(buttons[0]);

      //ASSERT
      expect(props.handleClose).toHaveBeenCalledTimes(1);
      expect(props.handleValidate).not.toHaveBeenCalled();
    });

    it("should call the validate handler once with the total when Confirm is clicked", async () => {
      //ARRANGE
      const user = userEvent.setup();
      render(
        <BookingSummary
          {...props}
          order={{ quantity: 2, addons: ["shuttle-pass"] }}
        />,
      );
      const buttons = screen.getAllByTestId("stepper-button");

      //ACT
      await user.click(buttons[1]);

      //ASSERT
      expect(props.handleValidate).toHaveBeenCalledTimes(1);
      expect(props.handleValidate).toHaveBeenCalledWith(478);
      expect(props.handleClose).not.toHaveBeenCalled();
    });
  });
});
