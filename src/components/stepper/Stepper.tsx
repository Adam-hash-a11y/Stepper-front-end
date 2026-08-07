import React, { useReducer } from "react";
import { initialState, stepperReducer } from "./reducer";
import { SET_ATTENDEE_FIELD } from "./actions";
import { PersonalInfoStep } from "../stepper-steps/personalInfoStep/PersonalInfoStep";
import { ContactStep } from "../stepper-steps/contactStep/ContactStep";

export const Stepper = () => {
  const [state, dispatch] = useReducer(stepperReducer, initialState);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: SET_ATTENDEE_FIELD,
      payload: {
        name: e.target.name,
        value: e.target.value,
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
    </>
  );
};
