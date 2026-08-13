import type React from "react";
import type { State } from "../../stepper/reducer";
import { StepperInput } from "../../shared/stepperField/StepperField";
import { InputType } from "../../stepper/types";
import { FormInputError } from "../../shared/inputError/InputError";

interface Props {
  order: State["order"];
  addons: State["addons"];
  handleCheckBoxToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTicketQuantity: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  touched: State["touched"];
  errors: State["errors"];
}

export const OrderStep: React.FunctionComponent<Props> = ({
  order,
  addons,
  handleTicketQuantity,
  handleCheckBoxToggle,
  handleBlur,
  touched,
  errors,
}) => {
  return (
    <>
      <StepperInput
        handleFiledChange={handleTicketQuantity}
        name="quantity"
        type={InputType.NUMBER}
        placeholder="How many Tickets ?"
        label="Quantity"
        id="QuantityID"
        value={order.quantity}
        handleBlur={handleBlur}
      />
      {touched.quantity && errors.quantity && (
        <FormInputError error={errors.quantity} />
      )}
      <h1>---Optional Addons---</h1>
      {addons.map((addon) => {
        return (
          <div key={addon.id}>
            <h1>{addon.name}</h1>
            <p>Description: {addon.description}</p>
            <p>Price: {addon.price}</p>
            <input
              type="checkbox"
              value={addon.id}
              checked={order.addons.includes(addon.id)}
              onChange={handleCheckBoxToggle}
            />
          </div>
        );
      })}
    </>
  );
};
