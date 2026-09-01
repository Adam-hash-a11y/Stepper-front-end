import type React from "react";
import styled from "styled-components";
import { PiXLogo, PiCube, PiWaveform } from "react-icons/pi";
import type { State } from "../../stepper/reducer";
import { InfoCallout } from "../../shared/infoCallout/InfoCallout";
import { useTranslation } from "react-i18next";

interface Props {
  selection: State["selection"];
  events: State["events"];
  handleEventSelection: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleTierSelection: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  awakenings: PiXLogo,
  tomorrowland: PiCube,
  timewarp: PiWaveform,
};

const SectionTitle = styled.h2`
  font-size: 28px;
  font-weight: 900;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 6px;
`;

const SectionSubtitle = styled.p`
  font-size: 12px;
  color: #888888;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 28px;
`;

const EventGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 48px;
`;

const EventCard = styled.div<{ selected: boolean }>`
  border: 1px solid ${(props) => (props.selected ? "#7c3aed" : "#222222")};
  padding: 40px 28px 28px;
  cursor: pointer;
  transition: border-color 0.15s ease;

  &:hover {
    border-color: #7c3aed;
  }
`;

const IconWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 56px;
  margin-bottom: 32px;
  color: #ffffff;
`;

const EventName = styled.h3`
  font-size: 22px;
  font-weight: 900;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-bottom: 4px;
`;

const EventSubtitle = styled.p`
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1px;
  color: #888888;
  text-transform: uppercase;
  margin-bottom: 16px;
`;

const DateRange = styled.p`
  font-size: 13px;
  font-weight: 700;
  color: #7c3aed;
  letter-spacing: 1px;
  margin-bottom: 4px;
`;

const Location = styled.p`
  font-size: 12px;
  color: #888888;
  letter-spacing: 0.5px;
  margin-bottom: 16px;
`;

const Divider = styled.div`
  border-top: 1px solid #222222;
  margin-bottom: 16px;
`;

const LineupLabel = styled.p`
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 2px;
  color: #666666;
  text-transform: uppercase;
  margin-bottom: 12px;
`;

const DjName = styled.p`
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-bottom: 8px;
`;

const MoreTba = styled.p`
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1px;
  color: #666666;
  text-transform: uppercase;
  margin-top: 4px;
`;

const TierList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const TierRow = styled.div<{ selected: boolean }>`
  display: grid;
  grid-template-columns: 32px 1fr auto auto 32px;
  align-items: center;
  gap: 20px;
  padding: 20px 24px;
  border: 1px solid ${(props) => (props.selected ? "#7c3aed" : "#222222")};
  cursor: pointer;
  transition: border-color 0.15s ease;

  &:hover {
    border-color: #7c3aed;
  }
`;

const RadioOuter = styled.span<{ selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1px solid ${(props) => (props.selected ? "#7c3aed" : "#555555")};
`;

const RadioInner = styled.span<{ selected: boolean }>`
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background-color: ${(props) => (props.selected ? "#7c3aed" : "transparent")};
`;

const TierNameGroup = styled.div`
  display: flex;
  align-items: baseline;
  gap: 12px;
`;

const TierName = styled.span`
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

const TierMeta = styled.span`
  font-size: 11px;
  color: #666666;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const TierPrice = styled.span`
  font-size: 18px;
  font-weight: 900;
  color: #7c3aed;
`;

const TierSpots = styled.span`
  font-size: 11px;
  color: #888888;
  letter-spacing: 1px;
  text-transform: uppercase;
  white-space: nowrap;
`;

const Chevron = styled.span`
  color: #7c3aed;
  font-size: 16px;
  text-align: right;
`;
const RequiredStar = styled.span`
  color: #dc2626;
`;

export const EventTierStep: React.FunctionComponent<Props> = ({
  events,
  selection,
  handleEventSelection,
  handleTierSelection,
}) => {
  const selectedEvent = events.find((event) => event.id === selection.eventId);
  const { t, i18n } = useTranslation();

  return (
    <>
      <InfoCallout text="Select the festival you'd like to attend and choose a ticket tier. Each tier includes different perks and access levels, so pick the one that fits your experience." />

      <SectionTitle>{t("event")}</SectionTitle>
      <SectionSubtitle>
        Choose your festival experience <RequiredStar>*</RequiredStar>
      </SectionSubtitle>

      <EventGrid>
        {events.map((event) => {
          const Icon = iconMap[event.icon] ?? PiCube;
          return (
            <EventCard
              key={event.id}
              id={event.id}
              onClick={handleEventSelection}
              selected={selection.eventId === event.id}
            >
              <IconWrap>
                <Icon size={48} />
              </IconWrap>
              <EventName>{event.name}</EventName>
              <EventSubtitle>{event.subtitle}</EventSubtitle>
              <DateRange>{event.dateRange}</DateRange>
              <Location>{event.location}</Location>
              <Divider />
              <LineupLabel>Lineup A-Z</LineupLabel>
              {event.djs.slice(0, 4).map((dj) => (
                <DjName key={dj.name}>{dj.name}</DjName>
              ))}
              {event.djs.length > 4 && <MoreTba>+ More TBA</MoreTba>}
            </EventCard>
          );
        })}
      </EventGrid>

      {selectedEvent && (
        <>
          <SectionTitle>Select Your Pass</SectionTitle>
          <SectionSubtitle>
            Choose your ticket tier <RequiredStar>*</RequiredStar>
          </SectionSubtitle>

          <TierList>
            {selectedEvent.tiers.map((tier) => (
              <TierRow
                key={tier.id}
                id={tier.id}
                onClick={handleTierSelection}
                selected={selection.tierId === tier.id}
              >
                <RadioOuter selected={selection.tierId === tier.id}>
                  <RadioInner selected={selection.tierId === tier.id} />
                </RadioOuter>
                <TierNameGroup>
                  <TierName>{tier.name}</TierName>
                  <TierMeta>{tier.subtitle}</TierMeta>
                </TierNameGroup>
                <TierPrice>€{tier.price}.00</TierPrice>
                <TierSpots>{tier.remaining} Spots Left</TierSpots>
                <Chevron>›</Chevron>
              </TierRow>
            ))}
          </TierList>
        </>
      )}
    </>
  );
};
