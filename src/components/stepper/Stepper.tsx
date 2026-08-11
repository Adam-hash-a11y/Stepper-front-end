import React, { useReducer } from "react";
import { initialState, stepperReducer } from "./reducer";
import {
  SET_ATTENDEE_FIELD,
  SET_ORDER_FIELD,
  SET_SELECTION,
  TOGGLE_ADDON,
} from "./actions";
import { PersonalInfoStep } from "../stepper-steps/personalInfoStep/PersonalInfoStep";
import { ContactStep } from "../stepper-steps/contactStep/ContactStep";
import { EventTierStep } from "../stepper-steps/eventTierStep/EventTierStep";
import { OrderStep } from "../stepper-steps/orderStep/OrderStep";
export const Stepper = () => {
  const [state, dispatch] = useReducer(stepperReducer, initialState);
  console.log(state);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: SET_ATTENDEE_FIELD,
      payload: {
        name: e.target.name,
        value: e.target.value,
      },
    });
  };

  const handleTicketQuantityChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    dispatch({
      type: SET_ORDER_FIELD,
      payload: {
        name: e.target.name,
        value: e.target.value,
      },
    });
  };

  const handleAddonCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: TOGGLE_ADDON,
      payload: {
        addonId: e.target.value,
      },
    });
  };
  const handleEventSelect = (e: React.MouseEvent<HTMLDivElement>) => {
    dispatch({
      type: SET_SELECTION,
      payload: {
        name: "eventId",
        value: e.currentTarget.id,
      },
    });
  };

  const handleSelectTier = (e: React.MouseEvent<HTMLDivElement>) => {
    dispatch({
      type: SET_SELECTION,
      payload: {
        name: "tierId",
        value: e.currentTarget.id,
      },
    });
  };

  return (
    <>
      <PersonalInfoStep
        attendee={state.attendee}
        handleInputChange={handleInputChange}
      />
      <ContactStep
        attendee={state.attendee}
        handleInputChange={handleInputChange}
      />

      <EventTierStep
        events={state.events}
        selection={state.selection}
        handleEventSelection={handleEventSelect}
        handleTierSelection={handleSelectTier}
      />

      <OrderStep
        order={state.order}
        handleTicketQuantity={handleTicketQuantityChange}
        addons={state.addons}
        handleCheckBoxToggle={handleAddonCheckBox}
      />
    </>
  );
};
