import type React from "react";
import styled, { css } from "styled-components";

interface Props {
  label: string;
  handleButton?: () => void;
  disabled?: boolean;
  variant?: "solid" | "outline";
  id?: string;
}

const Button = styled.button<{ variant: "solid" | "outline" }>`
  padding: 18px 40px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-family: inherit;
  cursor: pointer;

  ${(props) =>
    props.variant === "outline"
      ? css`
          border: 1px solid #7c3aed;
          background-color: transparent;
          color: #7c3aed;
        `
      : css`
          border: none;
          background-color: #7c3aed;
          color: #000000;
        `}

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const StepperButton: React.FunctionComponent<Props> = ({
  label,
  handleButton,
  disabled,
  variant = "solid",
  id,
}) => {
  return (
    <Button
      id={id}
      onClick={handleButton}
      disabled={disabled}
      variant={variant}
    >
      {label}
    </Button>
  );
};
