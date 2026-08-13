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
}

export const StepperInput: React.FunctionComponent<Props> = ({
  name,
  type,
  placeholder,
  handleFiledChange,
  handleBlur,
  label,
  id,
  value,
}) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        value={value}
        type={type}
        name={name}
        placeholder={placeholder}
        id={id}
        onChange={handleFiledChange}
        onBlur={handleBlur}
      />
    </>
  );
};
