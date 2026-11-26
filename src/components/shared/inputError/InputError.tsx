import styled from "styled-components";
import { useTranslation } from "react-i18next";

interface Props {
  error: string;
}

const ErrorText = styled.p`
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.5px;
  color: #dc2626;
  margin-top: 6px;
`;

export const FormInputError: React.FunctionComponent<Props> = ({ error }) => {
  const { t } = useTranslation();

  return <ErrorText data-testid="input-error">{t(error)}</ErrorText>;
};
