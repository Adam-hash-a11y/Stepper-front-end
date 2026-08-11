import type React from "react";

interface Props {
  label: string;
  handleButton?: () => void;
  disabled?: boolean;
}

export const StepperButton: React.FunctionComponent<Props> = ({
  label,
  handleButton,
  disabled,
}) => {
  return (
    <button onClick={handleButton} disabled={disabled}>
      {label}
    </button>
  );
};
