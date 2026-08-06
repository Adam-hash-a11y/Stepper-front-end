import React, { useReducer } from "react";
import { initialState, stepperReducer } from "./reducer";
import { SET_FILED } from "./actions";

export const Stepper = () => {
  const [state, dispatch] = useReducer(stepperReducer, initialState);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: SET_FILED,
      payload: {
        section: "attendee",
        name: e.target.name,
        value: e.target.value,
      },
    });
  };

  return (
    <>
      <label htmlFor="firstNameID">First name:</label>
      <input
        type="text"
        id="firstNameID"
        placeholder=""
        value={state.attendee.firstName}
        name="firstName"
        onChange={handleInputChange}
      />
    </>
  );
};
