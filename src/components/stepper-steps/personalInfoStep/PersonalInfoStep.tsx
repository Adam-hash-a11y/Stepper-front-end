import type React from "react";
import { StepperInput } from "../../shared/stepperField/StepperField";
import type { State } from "../../stepper/reducer";
import { InputType } from "../../stepper/types";

interface Props {
  attendee: State["attendee"];
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PersonalInfoStep: React.FunctionComponent<Props> = ({
  attendee,
  handleInputChange,
}) => {
  return (
    <>
      <StepperInput
        handleFiledChange={handleInputChange}
        name="firstName"
        type={InputType.TEXT}
        placeholder="First name"
        label="First Name"
        id="FirstNameID"
        value={attendee.firstName}
      />
      <StepperInput
        handleFiledChange={handleInputChange}
        name="lastName"
        type={InputType.TEXT}
        placeholder="Last Name"
        label="Last Name"
        id="LastNameID"
        value={attendee.lastName}
      />
    </>
  );
};
