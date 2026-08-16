import styled from "styled-components";

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32px 48px;
  background-color: #0a0a0a;
`;

const Logo = styled.div`
  font-family: "Orbitron", sans-serif;
  font-weight: 900;
  font-size: 28px;
  letter-spacing: 1px;
  color: #ffffff;
  text-transform: uppercase;
`;

const Nav = styled.nav`
  display: flex;
  gap: 40px;
`;

const NavItem = styled.a`
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #ffffff;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: #7c3aed;
  }
`;

export const Header: React.FunctionComponent = () => {
  return (
    <HeaderWrapper>
      <Logo>Voltage</Logo>
      <Nav>
        <NavItem>Home</NavItem>
        <NavItem>Festivals</NavItem>
        <NavItem>Info</NavItem>
        <NavItem>Account</NavItem>
      </Nav>
    </HeaderWrapper>
  );
};
