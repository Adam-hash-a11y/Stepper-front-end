import type React from "react";
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
  if (disabled === true) {
    return (
      <>
        <Tooltip anchorSelect="#NextID">
          {NEXT_BUTTON_TOOLTIP[currentStep]}
        </Tooltip>
        <StepperButton
          handleButton={handleNextStep}
          label="Next"
          disabled={disabled}
          id="NextID"
        />
      </>
    );
  } else {
    return (
      <StepperButton
        handleButton={handleNextStep}
        label="Next"
        disabled={disabled}
        id="NextID"
      />
    );
  }
};
