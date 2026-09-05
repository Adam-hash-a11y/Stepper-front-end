import type React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

interface Props {
  step: number;
}

const List = styled.ol`
  display: flex;
  align-items: flex-start;
  list-style: none;
  padding: 40px 48px;
`;

const Item = styled.li`
  flex: 1 1 0;
  min-width: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const Line = styled.span<{ active: boolean; done: boolean }>`
  flex: 1 1 0;
  min-width: 0;

  height: 1px;
  margin: 16px 16px 0;

  background-color: ${(props) =>
    props.active ? "#7c3aed" : props.done ? "#ffffff" : "#333333"};
`;

const Circle = styled.span<{ active: boolean; done: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 32px;
  height: 32px;
  flex-shrink: 0;

  border-radius: 50%;
  font-size: 13px;
  font-weight: 700;

  border: 1px solid
    ${(props) =>
      props.active ? "#7c3aed" : props.done ? "#ffffff" : "#333333"};

  color: ${(props) =>
    props.active ? "#7c3aed" : props.done ? "#ffffff" : "#333333"};
`;

const Label = styled.span<{ active: boolean; done: boolean }>`
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;

  white-space: nowrap;
  text-align: center;

  color: ${(props) =>
    props.active ? "#7c3aed" : props.done ? "#ffffff" : "#555555"};
`;

export const ProgressBar: React.FunctionComponent<Props> = ({ step }) => {
  const { t } = useTranslation();

  return (
    <List>
      <Item>
        <Circle active={step === 1} done={step > 1}>
          1
        </Circle>
        <Label active={step === 1} done={step > 1}>
          {t("progressBar.personalInfo")}
        </Label>
      </Item>

      <Line active={step === 2} done={step > 2} />

      <Item>
        <Circle active={step === 2} done={step > 2}>
          2
        </Circle>
        <Label active={step === 2} done={step > 2}>
          {t("progressBar.contact")}
        </Label>
      </Item>

      <Line active={step === 3} done={step > 3} />

      <Item>
        <Circle active={step === 3} done={step > 3}>
          3
        </Circle>
        <Label active={step === 3} done={step > 3}>
          {t("progressBar.eventTier")}
        </Label>
      </Item>

      <Line active={step === 4} done={step > 4} />

      <Item>
        <Circle active={step === 4} done={step > 4}>
          4
        </Circle>
        <Label active={step === 4} done={step > 4}>
          {t("progressBar.order")}
        </Label>
      </Item>
    </List>
  );
};
