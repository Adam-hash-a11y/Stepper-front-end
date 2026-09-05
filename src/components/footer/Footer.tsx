import styled from "styled-components";
import { useTranslation } from "react-i18next";

const FooterWrapper = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32px 48px;
  background-color: #0a0a0a;
`;

const Logo = styled.div`
  font-family: "Orbitron", sans-serif;
  font-weight: 900;
  font-size: 18px;
  letter-spacing: 1px;
  color: #ffffff;
  text-transform: uppercase;
`;

const Links = styled.nav`
  display: flex;
  gap: 32px;
`;

const LinkItem = styled.a`
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #888888;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: #7c3aed;
  }
`;

const Copyright = styled.p`
  font-size: 11px;
  letter-spacing: 1px;
  color: #555555;
  text-transform: uppercase;
`;

export const Footer: React.FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <FooterWrapper>
      <Logo>Voltage</Logo>

      <Links>
        <LinkItem>{t("footer.terms")}</LinkItem>
        <LinkItem>{t("footer.privacy")}</LinkItem>
        <LinkItem>{t("footer.support")}</LinkItem>
      </Links>

      <Copyright>{t("footer.copyright")}</Copyright>
    </FooterWrapper>
  );
};
