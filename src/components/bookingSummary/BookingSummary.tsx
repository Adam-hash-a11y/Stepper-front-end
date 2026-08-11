import type React from "react";
import type { State } from "../stepper/reducer";

interface Props {
  attendee: State["attendee"];
  events: State["events"];
  addons: State["addons"];
  selection: State["selection"];
  order: State["order"];
}

export const BookingSummary: React.FunctionComponent<Props> = ({
  attendee,
  events,
  addons,
  selection,
  order,
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
      <h2>Attendee</h2>
      <p>
        {attendee.firstName} {attendee.lastName}
      </p>
      <p>{attendee.email}</p>
      <p>{attendee.phone}</p>

      <h2>Event</h2>
      <p>{selectedEvent?.name}</p>
      <p>{selectedEvent?.dateRange}</p>

      <h2>Tier</h2>
      <p>{selectedTier?.name}</p>
      <p>${selectedTier?.price}</p>

      <h2>Order</h2>
      <p>Quantity: {order.quantity}</p>

      <h2>Addons</h2>
      {selectedAddons.map((addon) => (
        <p key={addon.id}>
          {addon.name} — ${addon.price}
        </p>
      ))}
      <p>Total price is : {totalPrice} $</p>
    </div>
  );
};
