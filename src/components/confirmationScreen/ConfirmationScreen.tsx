import type React from "react";
import styled from "styled-components";
import type { State } from "../stepper/reducer";
import { StepperButton } from "../shared/stepperButton/StepperButton";
import { useTranslation } from "react-i18next";

interface Props {
  attendee: State["attendee"];
  events: State["events"];
  addons: State["addons"];
  selection: State["selection"];
  order: State["order"];
  totalPrice: State["totalPrice"];
  bookingId: State["bookingId"];
  handleStartOver: () => void;
}

const Wrapper = styled.div`
  padding: 60px 0;
`;

const WelcomeTitle = styled.h1`
  font-size: 36px;
  font-weight: 900;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 8px;
`;

const WelcomeSubtitle = styled.p`
  font-size: 13px;
  color: #888888;
  letter-spacing: 1px;
  margin-bottom: 8px;
`;

const BookingIdBadge = styled.div`
  display: inline-block;
  border: 1px solid #7c3aed;
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 2px;
  color: #7c3aed;
  margin-bottom: 40px;
`;

const SectionTitle = styled.h3`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #7c3aed;
  margin: 24px 0 12px;

  &:first-of-type {
    margin-top: 0;
  }
`;

const Divider = styled.div`
  border-top: 1px solid #222222;
  margin: 20px 0;
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
  padding: 20px 0 32px;
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

export const ConfirmationScreen: React.FunctionComponent<Props> = ({
  attendee,
  events,
  addons,
  selection,
  order,
  totalPrice,
  bookingId,
  handleStartOver,
}) => {
  const { t } = useTranslation();

  const selectedEvent = events.find((event) => event.id === selection.eventId);
  const selectedTier = selectedEvent?.tiers.find(
    (tier) => tier.id === selection.tierId,
  );
  const selectedAddons = addons.filter((addon) =>
    order.addons.includes(addon.id),
  );

  return (
    <Wrapper>
      <WelcomeTitle>{t("confirmation.welcome")}</WelcomeTitle>

      <WelcomeSubtitle>{t("confirmation.bookingConfirmed")}</WelcomeSubtitle>

      <BookingIdBadge>{bookingId}</BookingIdBadge>

      <SectionTitle>{t("confirmation.attendee")}</SectionTitle>

      <Row>
        <Label>{t("confirmation.name")}</Label>
        <Value>
          {attendee.firstName} {attendee.lastName}
        </Value>
      </Row>

      <Row>
        <Label>{t("confirmation.email")}</Label>
        <Value>{attendee.email}</Value>
      </Row>

      <Row>
        <Label>{t("confirmation.phone")}</Label>
        <Value>{attendee.phone}</Value>
      </Row>

      <Divider />

      <SectionTitle>{t("confirmation.eventAndTier")}</SectionTitle>

      <Row>
        <Label>{t("confirmation.event")}</Label>
        <Value>{selectedEvent?.name}</Value>
      </Row>

      <Row>
        <Label>{t("confirmation.dates")}</Label>
        <Value>{selectedEvent?.dateRange}</Value>
      </Row>

      <Row>
        <Label>{t("confirmation.tier")}</Label>
        <Value>{selectedTier?.name}</Value>
      </Row>

      <Row>
        <Label>{t("confirmation.tierPrice")}</Label>
        <Value>€{selectedTier?.price}.00</Value>
      </Row>

      <Row>
        <Label>{t("confirmation.quantity")}</Label>
        <Value>{order.quantity}</Value>
      </Row>

      {selectedAddons.length > 0 && (
        <>
          <Divider />

          <SectionTitle>{t("confirmation.addons")}</SectionTitle>

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
        <TotalLabel>{t("confirmation.totalPaid")}</TotalLabel>
        <TotalPrice>€{totalPrice}.00</TotalPrice>
      </TotalRow>

      <StepperButton
        handleButton={handleStartOver}
        label={t("confirmation.goBackHome")}
      />
    </Wrapper>
  );
};
