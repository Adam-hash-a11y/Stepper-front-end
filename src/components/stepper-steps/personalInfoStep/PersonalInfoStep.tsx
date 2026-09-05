import type React from "react";
import { useTranslation } from "react-i18next";
import { StepperInput } from "../../shared/stepperField/StepperField";
import type { State } from "../../stepper/reducer";
import { InputType } from "../../stepper/types";
import { FormInputError } from "../../shared/inputError/InputError";
import { Tooltip } from "react-tooltip";
import { InfoCallout } from "../../shared/infoCallout/InfoCallout";

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
  const { t } = useTranslation();

  return (
    <>
      <Tooltip anchorSelect="#FirstNameID" place="top">
        {t("personalInfo.firstNameTooltip")}
      </Tooltip>

      <InfoCallout text={t("personalInfo.info")} />

      <StepperInput
        handleFiledChange={handleInputChange}
        name="firstName"
        type={InputType.TEXT}
        placeholder={t("personalInfo.firstNamePlaceholder")}
        label={t("personalInfo.firstNameLabel")}
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
        {t("personalInfo.lastNameTooltip")}
      </Tooltip>

      <StepperInput
        handleFiledChange={handleInputChange}
        name="lastName"
        type={InputType.TEXT}
        placeholder={t("personalInfo.lastNamePlaceholder")}
        label={t("personalInfo.lastNameLabel")}
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
