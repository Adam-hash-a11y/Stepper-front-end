import type React from "react";
import styled from "styled-components";
import { StepperButton } from "../stepperButton/StepperButton";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  handleValidate?: () => void;
  children: React.ReactNode;
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalBox = styled.section`
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  max-width: 400px;
`;

export const CheckoutModal: React.FunctionComponent<Props> = ({
  isOpen,
  handleClose,
  handleValidate,
  children,
}) => {
  if (!isOpen) {
    return null;
  } else {
    return (
      <Overlay>
        <ModalBox>
          <p>Are you sure you want to proceed ?</p>
          {children}
          <StepperButton
            handleButton={handleValidate}
            label="Confirm"
          ></StepperButton>
          <StepperButton
            handleButton={handleClose}
            label="Cancel"
          ></StepperButton>
        </ModalBox>
      </Overlay>
    );
  }
};
