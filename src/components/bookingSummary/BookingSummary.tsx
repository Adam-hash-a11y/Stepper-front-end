import type React from "react";
import type { State } from "../stepper/reducer";
import { StepperButton } from "../shared/stepperButton/StepperButton";
import styled from "styled-components";

interface Props {
  attendee: State["attendee"];
  events: State["events"];
  addons: State["addons"];
  selection: State["selection"];
  order: State["order"];
  handleValidate: (totalPrice: number) => void;
}

const SectionTitle = styled.h2`
  color: black;
`;

export const BookingSummary: React.FunctionComponent<Props> = ({
  attendee,
  events,
  addons,
  selection,
  order,
  handleValidate,
}) => {
  const selectedEvent = events.find((event) => event.id === selection.eventId);
  const selectedTier = selectedEvent?.tiers.find(
    (tier) => tier.id === selection.tierId,
  );
  const selectedAddons = addons.filter((addon) =>
    order.addons.includes(addon.id),
  );

  const ticketsCost = (selectedTier?.price ?? 0) * order.quantity;
  const addonsCost = selectedAddons.reduce(
    (total, addon) => total + addon.price,
    0,
  );
  const totalPrice = ticketsCost + addonsCost;

  return (
    <div>
      <SectionTitle>Attendee</SectionTitle>
      <p>
        {attendee.firstName} {attendee.lastName}
      </p>
      <p>{attendee.email}</p>
      <p>{attendee.phone}</p>

      <SectionTitle>Event</SectionTitle>
      <p>{selectedEvent?.name}</p>
      <p>{selectedEvent?.dateRange}</p>

      <SectionTitle>Tier</SectionTitle>
      <p>{selectedTier?.name}</p>
      <p>${selectedTier?.price}</p>

      <SectionTitle>Order</SectionTitle>
      <p>Quantity: {order.quantity}</p>

      <SectionTitle>Addons</SectionTitle>
      {selectedAddons.map((addon) => (
        <p key={addon.id}>
          {addon.name} — ${addon.price}
        </p>
      ))}
      <p>Total price is : {totalPrice} $</p>
      <StepperButton
        handleButton={() => handleValidate(totalPrice)}
        label="Confirm"
      />
    </div>
  );
};
