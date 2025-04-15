import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

/**
 * Animation keyframes
 */
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

/**
 * Styled components for introduction section
 */
const IntroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(
    135deg, 
    ${props => props.theme.colors.black} 0%, 
    ${props => props.theme.colors.orchid} 100%
  );
  color: ${props => props.theme.colors.white};
  position: relative;
  overflow: hidden;
`;

const IntroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="${encodeURIComponent('#d3b1c2')}" fill-opacity="0.1" fill-rule="evenodd"%3E%3Ccircle cx="3" cy="3" r="3"/%3E%3Ccircle cx="13" cy="13" r="3"/%3E%3C/g%3E%3C/svg%3E');
  opacity: 0.5;
`;

const IntroContent = styled.div`
  max-width: 800px;
  text-align: center;
  z-index: 2;
`;

const IntroName = styled.h1`
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.mauve};
  animation: ${fadeIn} 0.8s ease-out forwards;
  opacity: 0;

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const IntroTitle = styled.h2`
  font-size: 2.2rem;
  font-weight: 500;
  margin-bottom: 2rem;
  color: ${props => props.theme.colors.lavender};
  animation: ${fadeIn} 0.8s ease-out 0.2s forwards;
  opacity: 0;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const IntroDescription = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 2.5rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  animation: ${fadeIn} 0.8s ease-out 0.4s forwards;
  opacity: 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  animation: ${fadeIn} 0.8s ease-out 0.6s forwards;
  opacity: 0;

  @media (max-width: 576px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const Button = styled.a`
  display: inline-block;
  padding: 0.8rem 1.8rem;
  border-radius: ${props => props.theme.borderRadius.medium};
  font-weight: 600;
  text-decoration: none;
  transition: ${props => props.theme.transitions.standard};
  cursor: pointer;
  
  &:focus {
    outline: 2px solid ${props => props.theme.colors.white};
    outline-offset: 2px;
  }
`;

const PrimaryButton = styled(Button)`
  background-color: ${props => props.theme.colors.mauve};
  color: ${props => props.theme.colors.black};
  border: 2px solid ${props => props.theme.colors.mauve};

  &:hover {
    background-color: transparent;
    color: ${props => props.theme.colors.mauve};
    animation: ${pulse} 0.5s ease-in-out;
  }
`;

const SecondaryButton = styled(Button)`
  background-color: transparent;
  color: ${props => props.theme.colors.lavender};
  border: 2px solid ${props => props.theme.colors.lavender};

  &:hover {
    background-color: ${props => props.theme.colors.lavender};
    color: ${props => props.theme.colors.black};
    animation: ${pulse} 0.5s ease-in-out;
  }
`;

/**
 * Introduction component
 * Hero section/landing page with personal introduction and call to action buttons
 * Includes subtle animations for a more engaging user experience
 */
const Introduction = () => {
  // References to scroll to sections
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  // Smooth scroll function for navigation
  const scrollToSection = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle button clicks
  const handleProjectsClick = (e) => {
    e.preventDefault();
    scrollToSection('projects');
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    scrollToSection('contact');
  };

  return (
    <IntroSection id="intro">
      <IntroOverlay role="presentation" />
      <IntroContent>
        <IntroName>Godfrey Antomarlin</IntroName>
        <IntroTitle>Software Developer & AI Enthusiast</IntroTitle>
        <IntroDescription>
          I create elegant solutions through code. With a focus on user experience and scalable architecture, 
          I develop applications that make a difference.
        </IntroDescription>
        <ButtonContainer>
          <PrimaryButton 
            href="#projects" 
            onClick={handleProjectsClick}
            aria-label="View my project portfolio"
          >
            View My Work
          </PrimaryButton>
          <SecondaryButton 
            href="#contact" 
            onClick={handleContactClick}
            aria-label="Contact me through the form below"
          >
            Get In Touch
          </SecondaryButton>
        </ButtonContainer>
      </IntroContent>
    </IntroSection>
  );
};

export default Introduction;