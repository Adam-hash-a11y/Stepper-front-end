import type React from "react";
import styled from "styled-components";
import { FiInfo } from "react-icons/fi";

interface Props {
  text: string;
}

const CalloutWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 20px 24px;
  margin-bottom: 32px;
  border: 1px solid #2a2a2a;
  border-left: 3px solid #7c3aed;
  background-color: #0a0a0a;
`;

const IconCircle = styled.div`
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2px;

  svg {
    display: block;
    color: #7c3aed;
    width: 12px;
    height: 12px;
    stroke-width: 2.5px;
  }
`;

const CalloutText = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: #d4d4d4;
  margin: 0;
`;

export const InfoCallout: React.FunctionComponent<Props> = ({ text }) => {
  return (
    <CalloutWrapper>
      <IconCircle>
        <FiInfo />
      </IconCircle>
      <CalloutText>{text}</CalloutText>
    </CalloutWrapper>
  );
};
