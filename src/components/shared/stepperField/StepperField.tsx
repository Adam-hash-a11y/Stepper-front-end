import type { InputType } from "../../stepper/types";

interface Props {
  name: string;
  type: InputType;
  placeholder: string;
  handleFiledChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  id: string;
  value: string;
}

export const StepperInput: React.FunctionComponent<Props> = ({
  name,
  type,
  placeholder,
  handleFiledChange,
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
      />
    </>
  );
};
