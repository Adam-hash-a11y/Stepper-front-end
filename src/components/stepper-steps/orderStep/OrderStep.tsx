import type React from "react";
import type { State } from "../../stepper/reducer";
import { StepperInput } from "../../shared/stepperField/StepperField";
import { InputType } from "../../stepper/types";

interface Props {
  order: State["order"];
  addons: State["addons"];
  handleCheckBoxToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTicketQuantity: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const OrderStep: React.FunctionComponent<Props> = ({
  order,
  addons,
  handleTicketQuantity,
  handleCheckBoxToggle,
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
      />
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
