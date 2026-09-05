/* eslint-disable react/jsx-pascal-case */
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";

import { GB, FR, DE } from "country-flag-icons/react/3x2";

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32px 48px;
  background-color: #0a0a0a;
`;

const Logo = styled(Link)`
  font-family: "Orbitron", sans-serif;
  font-weight: 900;
  font-size: 28px;
  letter-spacing: 1px;
  color: #ffffff;
  text-transform: uppercase;
  text-decoration: none;
`;

const Nav = styled.nav`
  display: flex;
  gap: 40px;
`;

const NavItem = styled(NavLink)`
  position: relative;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #ffffff;
  text-decoration: none;
  cursor: pointer;
  padding-bottom: 4px;
  transition: color 0.2s ease;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background-color: #7c3aed;
    transform: scaleX(0);
    transform-origin: center;
    transition: transform 0.25s ease;
  }

  &:hover {
    color: #7c3aed;
  }

  &:hover::after {
    transform: scaleX(1);
  }

  &.active {
    color: #7c3aed;
  }

  &.active::after {
    transform: scaleX(1);
  }
`;

const NavSpan = styled.span`
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #ffffff;
  cursor: pointer;

  &:hover {
    color: #7c3aed;
  }
`;

const LanguageWrapper = styled.div`
  position: relative;
`;

const LanguageButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;

  height: 32px;
  padding: 0 10px;

  border: 1px solid #292929;
  border-radius: 4px;

  background: #0d0d0d;
  color: #ffffff;

  font-family: inherit;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1.5px;

  cursor: pointer;

  svg {
    width: 20px;
    height: 13px;
    display: block;
  }

  &:hover {
    border-color: #7c3aed;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 6px);
  right: 0;

  width: 110px;
  padding: 4px;

  background: #101010;
  border: 1px solid #292929;
  border-radius: 4px;

  z-index: 1000;
`;

const LanguageOption = styled.button<{ $active: boolean }>`
  width: 100%;
  height: 30px;

  display: flex;
  align-items: center;
  gap: 9px;

  padding: 0 7px;

  border: none;
  border-radius: 3px;

  background: ${({ $active }) =>
    $active ? "rgba(124, 58, 237, 0.1)" : "transparent"};

  color: ${({ $active }) => ($active ? "#a78bfa" : "#999999")};

  font-family: inherit;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1.2px;

  cursor: pointer;

  svg {
    width: 20px;
    height: 13px;
    display: block;
  }

  &:hover {
    background: rgba(124, 58, 237, 0.08);
    color: #ffffff;
  }
`;

export const Header: React.FunctionComponent = () => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (code: string) => {
    setLanguage(code);
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  return (
    <HeaderWrapper>
      <Logo to="/">Voltage</Logo>

      <Nav>
        <NavItem to="/" end>
          {t("header.home")}
        </NavItem>

        <NavItem to="/booking">{t("header.booking")}</NavItem>

        <NavSpan>{t("header.festivals")}</NavSpan>

        <NavSpan>{t("header.info")}</NavSpan>

        <NavSpan>{t("header.account")}</NavSpan>
      </Nav>

      <LanguageWrapper>
        <LanguageButton type="button" onClick={() => setIsOpen(!isOpen)}>
          {language === "fr" && <FR />}
          {language === "de" && <DE />}
          {language === "en" && <GB />}
          {language.toUpperCase()}
        </LanguageButton>

        {isOpen && (
          <Dropdown>
            <LanguageOption
              type="button"
              $active={language === "en"}
              onClick={() => handleLanguageChange("en")}
            >
              <GB />
              EN
            </LanguageOption>

            <LanguageOption
              type="button"
              $active={language === "fr"}
              onClick={() => handleLanguageChange("fr")}
            >
              <FR />
              FR
            </LanguageOption>

            <LanguageOption
              type="button"
              $active={language === "de"}
              onClick={() => handleLanguageChange("de")}
            >
              <DE />
              DE
            </LanguageOption>
          </Dropdown>
        )}
      </LanguageWrapper>
    </HeaderWrapper>
  );
};
