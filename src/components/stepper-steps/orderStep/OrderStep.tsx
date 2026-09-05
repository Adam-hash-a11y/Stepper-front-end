import type React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import type { State } from "../../stepper/reducer";
import { StepperInput } from "../../shared/stepperField/StepperField";
import { InputType } from "../../stepper/types";
import { FormInputError } from "../../shared/inputError/InputError";
import { InfoCallout } from "../../shared/infoCallout/InfoCallout";
import { Tooltip } from "react-tooltip";

interface Props {
  order: State["order"];
  addons: State["addons"];
  handleCheckBoxToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTicketQuantity: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  touched: State["touched"];
  errors: State["errors"];
}

const SectionTitle = styled.h2`
  font-size: 28px;
  font-weight: 900;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 6px;
`;

const SectionSubtitle = styled.p`
  font-size: 12px;
  color: #888888;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 28px;
`;

const AddonList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const AddonRow = styled.label<{ checked: boolean }>`
  display: grid;
  grid-template-columns: 32px 1fr auto;
  align-items: center;
  gap: 20px;
  padding: 20px 24px;
  border: 1px solid ${(props) => (props.checked ? "#7c3aed" : "#222222")};
  cursor: pointer;
  transition: border-color 0.15s ease;

  &:hover {
    border-color: #7c3aed;
  }
`;

const CheckboxOuter = styled.span<{ checked: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 3px;
  border: 1px solid ${(props) => (props.checked ? "#7c3aed" : "#555555")};
  background-color: ${(props) => (props.checked ? "#7c3aed" : "transparent")};
  color: #000000;
  font-size: 12px;
  font-weight: 900;
`;

const HiddenCheckbox = styled.input`
  display: none;
`;

const AddonInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const AddonName = styled.span`
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

const AddonDescription = styled.span`
  font-size: 12px;
  color: #888888;
`;

const AddonPrice = styled.span`
  font-size: 18px;
  font-weight: 900;
  color: #7c3aed;
  white-space: nowrap;
`;

export const OrderStep: React.FunctionComponent<Props> = ({
  order,
  addons,
  handleTicketQuantity,
  handleCheckBoxToggle,
  handleBlur,
  touched,
  errors,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <InfoCallout text={t("order.info")} />

      <SectionTitle>{t("order.ticketQuantity")}</SectionTitle>
      <SectionSubtitle>{t("order.ticketQuantitySubtitle")}</SectionSubtitle>

      <Tooltip anchorSelect="#QuantityID" place="top">
        {t("order.quantityTooltip")}
      </Tooltip>

      <StepperInput
        handleFiledChange={handleTicketQuantity}
        name="quantity"
        type={InputType.NUMBER}
        placeholder={t("order.quantityPlaceholder")}
        label={t("order.quantityLabel")}
        id="QuantityID"
        value={order.quantity}
        handleBlur={handleBlur}
        error={errors.quantity}
        touched={touched.quantity}
      />

      {touched.quantity && errors.quantity && (
        <FormInputError error={errors.quantity} />
      )}

      <SectionTitle>{t("order.optionalAddons")}</SectionTitle>
      <SectionSubtitle>{t("order.addonsSubtitle")}</SectionSubtitle>

      <AddonList>
        {addons.map((addon) => {
          const checked = order.addons.includes(addon.id);

          return (
            <AddonRow key={addon.id} checked={checked}>
              <CheckboxOuter checked={checked}>{checked && "✓"}</CheckboxOuter>

              <AddonInfo>
                <AddonName>{t(`addons.${addon.id}.name`)}</AddonName>
                <AddonDescription>
                  {t(`addons.${addon.id}.description`)}
                </AddonDescription>
              </AddonInfo>

              <AddonPrice>€{addon.price}.00</AddonPrice>

              <HiddenCheckbox
                type="checkbox"
                value={addon.id}
                checked={checked}
                onChange={handleCheckBoxToggle}
              />
            </AddonRow>
          );
        })}
      </AddonList>
    </>
  );
};
