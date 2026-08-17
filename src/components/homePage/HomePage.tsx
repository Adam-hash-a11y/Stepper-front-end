import type React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";

const Hero = styled.section`
  position: relative;
  height: 74vh;
  display: flex;
  align-items: center;
  padding: 0 48px;
  box-sizing: border-box;
  overflow: hidden;
  background-color: #000000;
  background-image: url("/src/assets/Voltage-hero.png");
  background-size: cover;
  background-position: center;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.75) 0%,
    rgba(0, 0, 0, 0.35) 55%,
    rgba(0, 0, 0, 0.55) 100%
  );
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  max-width: 560px;
`;

const AccentLine = styled.div`
  width: 48px;
  height: 3px;
  background-color: #7c3aed;
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-family: "Orbitron", sans-serif;
  font-size: 56px;
  font-weight: 900;
  line-height: 1.1;
  text-transform: uppercase;
  margin-bottom: 24px;
`;

const Subtext = styled.p`
  font-size: 14px;
  color: #cccccc;
  letter-spacing: 1px;
  text-transform: uppercase;
  line-height: 1.8;
  margin-bottom: 40px;
`;

const BookButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 18px 32px;
  background-color: #7c3aed;
  color: #000000;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-decoration: none;
`;

const SideText = styled.div`
  position: absolute;
  right: 24px;
  top: 20%;
  width: 20px;
  transform: translateY(-50%) rotate(90deg);
  transform-origin: center;
  z-index: 1;
  display: flex;
  gap: 16px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #888888;
  white-space: nowrap;
`;

export const HomePage: React.FunctionComponent = () => {
  return (
    <Hero>
      <Overlay />
      <Content>
        <AccentLine />
        <Title>The Future Sounds Like This</Title>
        <Subtext>
          Underground vibes. World class artists. Unforgettable moments.
        </Subtext>
        <BookButton to="/booking">
          Book Now <FaArrowRight />
        </BookButton>
      </Content>
      <SideText>
        <span>Techno</span>
        <span>/</span>
        <span>Community</span>
        <span>/</span>
        <span>Freedom</span>
      </SideText>
    </Hero>
  );
};
