import type React from "react";
import type { State } from "../../stepper/reducer";

interface Props {
  selection: State["selection"];
  events: State["events"];
  handleEventSelection: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleTierSelection: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const EventTierStep: React.FunctionComponent<Props> = ({
  events,
  selection,
  handleEventSelection,
  handleTierSelection,
}) => {
  const selectedEvent = events.find((event) => event.id === selection.eventId);

  return (
    <>
      {events.map((event) => {
        return (
          <div key={event.id} id={event.id} onClick={handleEventSelection}>
            <h1>{event.name}</h1>
            <p>{event.dateRange}</p>
            <div>--DJS--</div>
            {event.djs.map((dj) => {
              return (
                <div key={dj.name}>
                  <h2>Dj: {dj.name}</h2>
                  <h3>Day: {dj.day}</h3>
                  <h4>Time: {dj.time}</h4>
                </div>
              );
            })}
          </div>
        );
      })}
      <div>---Event Pass Tiers---</div>
      {selectedEvent &&
        selectedEvent.tiers.map((tier) => {
          return (
            <div key={tier.id} id={tier.id} onClick={handleTierSelection}>
              <h1>Tier: {tier.name}</h1>
              <p>Tier Price: {tier.price}</p>
              <p>Total Spots: {tier.capacity}</p>
              <p>Spots Left: {tier.remaining}</p>
            </div>
          );
        })}
    </>
  );
};
