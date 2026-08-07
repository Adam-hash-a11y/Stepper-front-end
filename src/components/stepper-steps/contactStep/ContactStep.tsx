import type React from "react";
import type { State } from "../../stepper/reducer";
import { StepperInput } from "../../shared/stepperField/StepperField";
import { InputType } from "../../stepper/types";

interface Props {
  attendee: State["attendee"];
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ContactStep: React.FunctionComponent<Props> = ({
  attendee,
  handleInputChange,
}) => {
  return (
    <>
      <StepperInput
        handleFiledChange={handleInputChange}
        name="email"
        type={InputType.TEXT}
        placeholder="Email"
        label="Email"
        id="EmailID"
        value={attendee.email}
      />

      <StepperInput
        handleFiledChange={handleInputChange}
        name="phone"
        type={InputType.TEXT}
        placeholder="Phone"
        label="Phone Number"
        id="PhoneID"
        value={attendee.phone}
      />
    </>
  );
};
