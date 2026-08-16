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
  handleClose: () => void;
}

const SectionTitle = styled.h3`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #7c3aed;
  margin: 20px 0 10px;

  &:first-child {
    margin-top: 0;
  }
`;

const Divider = styled.div`
  border-top: 1px solid #222222;
  margin: 16px 0;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
`;

const Label = styled.span`
  font-size: 13px;
  color: #aaaaaa;
`;

const Value = styled.span`
  font-size: 13px;
  font-weight: 700;
  color: #ffffff;
  text-transform: uppercase;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0 24px;
`;

const TotalLabel = styled.span`
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #ffffff;
`;

const TotalPrice = styled.span`
  font-size: 24px;
  font-weight: 900;
  color: #7c3aed;
`;

const Actions = styled.div`
  display: flex;
  gap: 16px;
  justify-content: space-between;
`;

export const BookingSummary: React.FunctionComponent<Props> = ({
  attendee,
  events,
  addons,
  selection,
  order,
  handleValidate,
  handleClose,
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
      <Row>
        <Label>Name</Label>
        <Value>
          {attendee.firstName} {attendee.lastName}
        </Value>
      </Row>
      <Row>
        <Label>Email</Label>
        <Value>{attendee.email}</Value>
      </Row>
      <Row>
        <Label>Phone</Label>
        <Value>{attendee.phone}</Value>
      </Row>

      <Divider />

      <SectionTitle>Event & Tier</SectionTitle>
      <Row>
        <Label>Event</Label>
        <Value>{selectedEvent?.name}</Value>
      </Row>
      <Row>
        <Label>Dates</Label>
        <Value>{selectedEvent?.dateRange}</Value>
      </Row>
      <Row>
        <Label>Tier</Label>
        <Value>{selectedTier?.name}</Value>
      </Row>
      <Row>
        <Label>Tier Price</Label>
        <Value>€{selectedTier?.price}.00</Value>
      </Row>
      <Row>
        <Label>Quantity</Label>
        <Value>{order.quantity}</Value>
      </Row>

      {selectedAddons.length > 0 && (
        <>
          <Divider />
          <SectionTitle>Add-Ons</SectionTitle>
          {selectedAddons.map((addon) => (
            <Row key={addon.id}>
              <Label>{addon.name}</Label>
              <Value>€{addon.price}.00</Value>
            </Row>
          ))}
        </>
      )}

      <Divider />

      <TotalRow>
        <TotalLabel>Total</TotalLabel>
        <TotalPrice>€{totalPrice}.00</TotalPrice>
      </TotalRow>

      <Actions>
        <StepperButton
          handleButton={() => handleValidate(totalPrice)}
          label="Confirm"
        />
        <StepperButton
          handleButton={handleClose}
          label="Cancel"
          variant="outline"
        />
      </Actions>
    </div>
  );
};
