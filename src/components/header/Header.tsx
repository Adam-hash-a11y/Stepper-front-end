import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";

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

export const Header: React.FunctionComponent = () => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState("");
  const handleLanaguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
    i18n.changeLanguage(e.target.value);
  };

  return (
    <HeaderWrapper>
      <Logo to="/">Voltage</Logo>
      <select value={language} onChange={handleLanaguageChange}>
        <option value="fr">fr</option>
        <option value="en">en</option>
      </select>
      <Nav>
        <NavItem to="/" end>
          Home
        </NavItem>
        <NavItem to="/booking">Booking</NavItem>
        <NavSpan>Festivals</NavSpan>
        <NavSpan>Info</NavSpan>
        <NavSpan>Account</NavSpan>
      </Nav>
    </HeaderWrapper>
  );
};
