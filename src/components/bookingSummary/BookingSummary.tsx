import type React from "react";
import type { State } from "../stepper/reducer";
import { StepperButton } from "../shared/stepperButton/StepperButton";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

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

const ActionsSpacer = styled.div`
  height: 50px;
`;

const Actions = styled.div`
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  width: 480px;
  box-sizing: border-box;
  display: flex;
  gap: 16px;
  justify-content: space-between;
  background-color: #0a0a0a;
  border: 1px solid #7c3aed;
  border-top: none;
  padding: 30px 50px;
  z-index: 1001;
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
  const { t } = useTranslation();

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
      <SectionTitle>{t("bookingSummary.attendee")}</SectionTitle>

      <Row>
        <Label>{t("bookingSummary.name")}</Label>
        <Value>
          {attendee.firstName} {attendee.lastName}
        </Value>
      </Row>

      <Row>
        <Label>{t("bookingSummary.email")}</Label>
        <Value>{attendee.email}</Value>
      </Row>

      <Row>
        <Label>{t("bookingSummary.phone")}</Label>
        <Value>{attendee.phone}</Value>
      </Row>

      <Divider />

      <SectionTitle>{t("bookingSummary.eventAndTier")}</SectionTitle>

      <Row>
        <Label>{t("bookingSummary.event")}</Label>
        <Value>{selectedEvent?.name}</Value>
      </Row>

      <Row>
        <Label>{t("bookingSummary.dates")}</Label>
        <Value>{selectedEvent?.dateRange}</Value>
      </Row>

      <Row>
        <Label>{t("bookingSummary.tier")}</Label>
        <Value>{selectedTier?.name}</Value>
      </Row>

      <Row>
        <Label>{t("bookingSummary.tierPrice")}</Label>
        <Value>€{selectedTier?.price}.00</Value>
      </Row>

      <Row>
        <Label>{t("bookingSummary.quantity")}</Label>
        <Value>{order.quantity}</Value>
      </Row>

      {selectedAddons.length > 0 && (
        <>
          <Divider />

          <SectionTitle>{t("bookingSummary.addons")}</SectionTitle>

          {selectedAddons.map((addon) => (
            <Row key={addon.id}>
              <Label>{t(`addons.${addon.id}.name`)}</Label>
              <Value>€{addon.price}.00</Value>
            </Row>
          ))}
        </>
      )}

      <Divider />

      <TotalRow>
        <TotalLabel>{t("bookingSummary.total")}</TotalLabel>
        <TotalPrice>€{totalPrice}.00</TotalPrice>
      </TotalRow>

      <ActionsSpacer />

      <Actions>
        <StepperButton
          handleButton={handleClose}
          label={t("bookingSummary.cancel")}
          variant="outline"
        />

        <StepperButton
          handleButton={() => handleValidate(totalPrice)}
          label={t("bookingSummary.confirm")}
        />
      </Actions>
    </div>
  );
};
