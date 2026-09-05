import type React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

interface Props {
  isOpen: boolean;
  children: React.ReactNode;
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalBox = styled.section`
  background-color: #0a0a0a;
  border: 1px solid #7c3aed;
  padding: 40px;
  max-width: 480px;
  width: 100%;
  max-height: 85vh;
  overflow-y: auto;

  scrollbar-width: thin;
  scrollbar-color: #7c3aed #0a0a0a;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #0a0a0a;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #7c3aed;
    border-radius: 3px;
  }
`;

const ConfirmText = styled.p`
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #888888;
  margin-bottom: 24px;
`;

export const CheckoutModal: React.FunctionComponent<Props> = ({
  isOpen,
  children,
}) => {
  const { t } = useTranslation();

  if (!isOpen) {
    return null;
  }

  return (
    <Overlay>
      <ModalBox>
        <ConfirmText>{t("checkoutModal.confirmText")}</ConfirmText>
        {children}
      </ModalBox>
    </Overlay>
  );
};
