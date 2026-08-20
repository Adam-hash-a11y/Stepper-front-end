import type React from "react";
import { StepperInput } from "../../shared/stepperField/StepperField";
import type { State } from "../../stepper/reducer";
import { InputType } from "../../stepper/types";
import { FormInputError } from "../../shared/inputError/InputError";
import { Tooltip } from "react-tooltip";

interface Props {
  attendee: State["attendee"];
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  touched: State["touched"];
  errors: State["errors"];
}

export const PersonalInfoStep: React.FunctionComponent<Props> = ({
  attendee,
  handleInputChange,
  handleBlur,
  touched,
  errors,
}) => {
  return (
    <>
      <Tooltip anchorSelect="#FirstNameID" place="top">
        Please Write your First Name
      </Tooltip>
      <StepperInput
        handleFiledChange={handleInputChange}
        name="firstName"
        type={InputType.TEXT}
        placeholder="First name"
        label="First Name"
        id="FirstNameID"
        value={attendee.firstName}
        handleBlur={handleBlur}
        error={errors.firstName}
        touched={touched.firstName}
      />
      {touched.firstName && errors.firstName && (
        <FormInputError error={errors.firstName} />
      )}
      <Tooltip anchorSelect="#LastNameID" place="top">
        Please Write your Last Name
      </Tooltip>
      <StepperInput
        handleFiledChange={handleInputChange}
        name="lastName"
        type={InputType.TEXT}
        placeholder="Last Name"
        label="Last Name"
        id="LastNameID"
        value={attendee.lastName}
        handleBlur={handleBlur}
        error={errors.lastName}
        touched={touched.lastName}
      />
      {touched.lastName && errors.lastName && (
        <FormInputError error={errors.lastName} />
      )}
    </>
  );
};
