import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { EventTierStep } from "../../src/components/stepper-steps/eventTierStep/EventTierStep";
import { initialState } from "../../src/components/stepper/reducer";

const props = {
  events: initialState.events,
  selection: { eventId: "", tierId: "" },
  handleEventSelection: vi.fn(),
  handleTierSelection: vi.fn(),
};

describe("EventTierStep", () => {
  describe("passes visibility", () => {
    it("should show no passes when no event is selected", () => {
      //ARRANGE
      //ACT
      render(<EventTierStep {...props} />);

      //ASSERT
      expect(screen.queryAllByTestId("event-tier-pass")).toHaveLength(0);
    });

    it("should show only the passes of the selected event", () => {
      //ARRANGE
      //ACT
      render(
        <EventTierStep
          {...props}
          selection={{ eventId: "timewarp-2026", tierId: "" }}
        />,
      );

      //ASSERT
      const passes = screen.getAllByTestId("event-tier-pass");
      expect(passes).toHaveLength(2);
      expect(passes[0]).toHaveTextContent("General Admission");
      expect(passes[1]).toHaveTextContent("Premium");
    });
  });

  describe("user interactions", () => {
    it("should call the event handler once with the clicked event", async () => {
      //ARRANGE
      const user = userEvent.setup();
      render(<EventTierStep {...props} />);
      const cards = screen.getAllByTestId("event-tier-card");

      //ACT
      await user.click(cards[1]);

      //ASSERT
      expect(props.handleEventSelection).toHaveBeenCalledTimes(1);
      expect(props.handleEventSelection.mock.calls[0][0].target.id).toBe(
        "timewarp-2026",
      );
    });

    it("should call the tier handler once with the clicked pass", async () => {
      //ARRANGE
      const user = userEvent.setup();
      render(
        <EventTierStep
          {...props}
          selection={{ eventId: "awakenings-2026", tierId: "" }}
        />,
      );
      const passes = screen.getAllByTestId("event-tier-pass");

      //ACT
      await user.click(passes[2]);

      //ASSERT
      expect(props.handleTierSelection).toHaveBeenCalledTimes(1);
      expect(props.handleTierSelection.mock.calls[0][0].target.id).toBe("vip");
    });
  });

  describe("selected state", () => {
    it("should highlight only the selected event card", () => {
      //ARRANGE
      //ACT
      render(
        <EventTierStep
          {...props}
          selection={{ eventId: "awakenings-2026", tierId: "" }}
        />,
      );

      //ASSERT
      const cards = screen.getAllByTestId("event-tier-card");
      expect(cards[0]).toHaveStyle("border: 1px solid #7c3aed");
      expect(cards[1]).toHaveStyle("border: 1px solid #222222");
      expect(cards[2]).toHaveStyle("border: 1px solid #222222");
    });

    it("should highlight only the selected pass", () => {
      //ARRANGE
      //ACT
      render(
        <EventTierStep
          {...props}
          selection={{ eventId: "awakenings-2026", tierId: "weekend" }}
        />,
      );

      //ASSERT
      const passes = screen.getAllByTestId("event-tier-pass");
      expect(passes[0]).toHaveStyle("border: 1px solid #222222");
      expect(passes[1]).toHaveStyle("border: 1px solid #7c3aed");
      expect(passes[2]).toHaveStyle("border: 1px solid #222222");
    });
  });

  describe("lineup", () => {
    it("should show only 4 DJs and the more TBA text when an event has more than 4", () => {
      //ARRANGE
      const events = [
        {
          ...initialState.events[0],
          djs: [
            ...initialState.events[0].djs,
            { name: "Extra DJ", day: "Jul 12", time: "03:00" },
          ],
        },
      ];

      //ACT
      render(<EventTierStep {...props} events={events} />);

      //ASSERT
      expect(screen.getAllByTestId("event-tier-dj")).toHaveLength(4);
      expect(screen.queryByText("Extra DJ")).not.toBeInTheDocument();
      expect(screen.getByTestId("event-tier-more-tba")).toHaveTextContent(
        "+ More TBA",
      );
    });

    it("should not show the more TBA text when an event has exactly 4 DJs", () => {
      //ARRANGE
      const events = [initialState.events[0]];

      //ACT
      render(<EventTierStep {...props} events={events} />);

      //ASSERT
      expect(screen.getAllByTestId("event-tier-dj")).toHaveLength(4);
      expect(
        screen.queryByTestId("event-tier-more-tba"),
      ).not.toBeInTheDocument();
    });
  });
});
