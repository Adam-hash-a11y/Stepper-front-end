import React, { useReducer } from "react";
import { initialState, stepperReducer } from "./reducer";
import { SET_ATTENDEE_FIELD } from "./actions";
import { StepperInput } from "../shared/stepperField/StepperField";
import { InputType } from "./types";

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
      <StepperInput
        handleFiledChange={handleInputChange}
        name="firstName"
        type={InputType.TEXT}
        placeholder="First name"
        label="First Name"
        id="FirstNameID"
        value={state.attendee.firstName}
      />
      <StepperInput
        handleFiledChange={handleInputChange}
        name="lastName"
        type={InputType.TEXT}
        placeholder="Last name"
        label="Last Name"
        id="LastNameID"
        value={state.attendee.lastName}
      />
      <StepperInput
        handleFiledChange={handleInputChange}
        name="phone"
        type={InputType.TEXT}
        placeholder="Phone Number"
        label="Phone Number"
        id="PhoneNumberID"
        value={state.attendee.phone}
      />
      <StepperInput
        handleFiledChange={handleInputChange}
        name="email"
        type={InputType.TEXT}
        placeholder="Email"
        label="Email"
        id="EmailID"
        value={state.attendee.email}
      />
    </>
  );
};
