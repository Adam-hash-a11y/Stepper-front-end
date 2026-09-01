import type React from "react";
import type { State } from "../../stepper/reducer";
import { StepperInput } from "../../shared/stepperField/StepperField";
import { InputType } from "../../stepper/types";
import { FormInputError } from "../../shared/inputError/InputError";
import { InfoCallout } from "../../shared/infoCallout/InfoCallout";
import { Tooltip } from "react-tooltip";

interface Props {
  attendee: State["attendee"];
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  touched: State["touched"];
  errors: State["errors"];
}

export const ContactStep: React.FunctionComponent<Props> = ({
  attendee,
  handleInputChange,
  handleBlur,
  touched,
  errors,
}) => {
  return (
    <>
      <Tooltip anchorSelect="#EmailID" place="top">
        Please Write your Email
      </Tooltip>
      <InfoCallout text="Please provide a valid email address and phone number. We'll use these to send your ticket confirmation and any important updates about the event." />
      <StepperInput
        handleFiledChange={handleInputChange}
        name="email"
        type={InputType.TEXT}
        placeholder="Email"
        label="Email"
        id="EmailID"
        value={attendee.email}
        handleBlur={handleBlur}
        error={errors.email}
        touched={touched.email}
      />
      {touched.email && errors.email && <FormInputError error={errors.email} />}
      <Tooltip anchorSelect="#PhoneID" place="top">
        Please Write your Phone number
      </Tooltip>
      <StepperInput
        handleFiledChange={handleInputChange}
        name="phone"
        type={InputType.TEXT}
        placeholder="Phone"
        label="Phone Number"
        id="PhoneID"
        value={attendee.phone}
        handleBlur={handleBlur}
        error={errors.phone}
        touched={touched.phone}
      />
      {touched.phone && errors.phone && <FormInputError error={errors.phone} />}
    </>
  );
};
