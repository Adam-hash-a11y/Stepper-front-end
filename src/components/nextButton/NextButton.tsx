import type React from "react";
import { useTranslation } from "react-i18next";
import { StepperButton } from "../shared/stepperButton/StepperButton";
import { Tooltip } from "react-tooltip";
import { NEXT_BUTTON_TOOLTIP } from "../stepper/constants";

interface Props {
  disabled: boolean;
  handleNextStep: () => void;
  currentStep: number;
}

export const NextButton: React.FunctionComponent<Props> = ({
  disabled,
  handleNextStep,
  currentStep,
}) => {
  const { t } = useTranslation();

  if (disabled === true) {
    return (
      <>
        <Tooltip anchorSelect="#NextID">
          {t(NEXT_BUTTON_TOOLTIP[currentStep])}
        </Tooltip>

        <StepperButton
          handleButton={handleNextStep}
          label={t("nextButton.label")}
          disabled={disabled}
          id="NextID"
        />
      </>
    );
  }

  return (
    <StepperButton
      handleButton={handleNextStep}
      label={t("nextButton.label")}
      disabled={disabled}
      id="NextID"
    />
  );
};
