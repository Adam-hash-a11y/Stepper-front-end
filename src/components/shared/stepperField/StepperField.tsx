import styled from "styled-components";
import { FaCircleCheck, FaCircleExclamation } from "react-icons/fa6";
import type { InputType } from "../../stepper/types";

interface Props {
  name: string;
  type: InputType;
  placeholder: string;
  handleFiledChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  label: string;
  id: string;
  value: string | number;
  error?: string;
  touched?: boolean;
}

function getVariant(touched?: boolean, error?: string) {
  if (!touched) return "neutral";
  if (error) return "error";
  return "success";
}

const Field = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const baseInputStyles = `
  width: 100%;
  padding: 14px 40px 14px 16px;
  border-radius: 4px;
  font-size: 14px;
  font-family: inherit;
  background: #0a0a0a;
  color: #ffffff;
  transition: border-color 0.15s ease;

  &::placeholder {
    color: #555555;
  }

  &:focus {
    outline: none;
  }
`;

const NeutralInput = styled.input`
  ${baseInputStyles}
  border: 1px solid #333333;

  &:focus {
    border-color: #7c3aed;
  }
`;

const ErrorInput = styled.input`
  ${baseInputStyles}
  border: 1px solid #dc2626;
`;

const SuccessInput = styled.input`
  ${baseInputStyles}
  border: 1px solid #7c3aed;
`;

const inputVariants = {
  neutral: NeutralInput,
  error: ErrorInput,
  success: SuccessInput,
};

const SuccessIcon = styled(FaCircleCheck)`
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #7c3aed;
  font-size: 15px;
`;

const ErrorIcon = styled(FaCircleExclamation)`
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #dc2626;
  font-size: 15px;
`;

const StyledLabel = styled.label`
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #888888;
  margin-bottom: 8px;
`;

export const StepperInput: React.FunctionComponent<Props> = ({
  name,
  type,
  placeholder,
  handleFiledChange,
  handleBlur,
  label,
  id,
  value,
  error,
  touched,
}) => {
  const variant = getVariant(touched, error);
  const StyledInput = inputVariants[variant];

  return (
    <Field>
      <StyledLabel htmlFor={id}>{label}</StyledLabel>
      <InputWrapper>
        <StyledInput
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          id={id}
          onChange={handleFiledChange}
          onBlur={handleBlur}
        />
        {variant === "success" && <SuccessIcon aria-hidden="true" />}
        {variant === "error" && <ErrorIcon aria-hidden="true" />}
      </InputWrapper>
    </Field>
  );
};
