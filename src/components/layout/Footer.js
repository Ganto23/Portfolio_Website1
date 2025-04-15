import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

/**
 * Styled components for footer layout and styling
 */
const FooterContainer = styled.footer`
  background-color: ${props => props.theme.colors.black};
  color: ${props => props.theme.colors.white};
  padding: 3rem 0 2rem;
  position: relative;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const FooterSection = styled.div`
  margin-bottom: 1.5rem;
`;

const FooterTitle = styled.h3`
  color: ${props => props.theme.colors.mauve};
  font-size: 1.3rem;
  margin-bottom: 1.2rem;
  position: relative;
  padding-bottom: 0.8rem;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 2px;
    background-color: ${props => props.theme.colors.orchid};
    
    @media (max-width: 768px) {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

const FooterText = styled.p`
  line-height: 1.6;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.white}90;
`;

const FooterLinksList = styled.ul`
  list-style: none;
  padding: 0;
`;

const FooterLinkItem = styled.li`
  margin-bottom: 0.7rem;
`;

const FooterLink = styled(Link)`
  color: ${props => props.theme.colors.lavender};
  text-decoration: none;
  transition: ${props => props.theme.transitions.standard};
  
  &:hover {
    color: ${props => props.theme.colors.mauve};
    padding-left: 5px;
  }
  
  &:focus {
    outline: 1px solid ${props => props.theme.colors.lavender};
    outline-offset: 2px;
  }
`;

const ExternalLink = styled.a`
  color: ${props => props.theme.colors.lavender};
  text-decoration: none;
  transition: ${props => props.theme.transitions.standard};
  
  &:hover {
    color: ${props => props.theme.colors.mauve};
  }
  
  &:focus {
    outline: 1px solid ${props => props.theme.colors.lavender};
    outline-offset: 2px;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: ${props => props.theme.colors.white};
  background-color: ${props => props.theme.colors.orchid}80;
  transition: ${props => props.theme.transitions.standard};
  
  &:hover {
    background-color: ${props => props.theme.colors.lavender};
    transform: translateY(-3px);
  }
  
  &:focus {
    outline: 2px solid ${props => props.theme.colors.lavender};
    outline-offset: 2px;
  }
`;

const FooterBottom = styled.div`
  margin-top: 3rem;
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid ${props => props.theme.colors.orchid}30;
`;

const Copyright = styled.p`
  color: ${props => props.theme.colors.white}70;
  font-size: 0.9rem;
`;

/**
 * Footer component
 * Provides site navigation, contact information, and social links
 * Organized into sections for better structure and readability
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // Handle smooth scrolling for contact section
  const handleContactClick = (e) => {
    e.preventDefault();
    
    // Check if we're on the home page
    if (window.location.pathname === '/') {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If we're not on the home page, navigate to home and then to contact
      window.location.href = '/#contact';
    }
  };
  
  return (
    <FooterContainer role="contentinfo">
      <FooterContent>
        <FooterSection>
          <FooterTitle>About Me</FooterTitle>
          <FooterText>
            I'm Godfrey Antomarlin, a software developer passionate about creating 
            innovative solutions and exploring new technologies.
          </FooterText>
          <SocialLinks aria-label="Social media links">
            <SocialLink 
              href="https://github.com/Ganto23" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Visit my GitHub profile"
            >
              <i className="fab fa-github" aria-hidden="true"></i>
            </SocialLink>
            <SocialLink 
              href="https://linkedin.com/in/godfrey-antomarlin" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Visit my LinkedIn profile"
            >
              <i className="fab fa-linkedin-in" aria-hidden="true"></i>
            </SocialLink>
            <SocialLink 
              href="https://twitter.com/godfreyantomarlin" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Visit my Twitter profile"
            >
              <i className="fab fa-twitter" aria-hidden="true"></i>
            </SocialLink>
          </SocialLinks>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Quick Links</FooterTitle>
          <nav aria-label="Footer navigation">
            <FooterLinksList>
              <FooterLinkItem>
                <FooterLink to="/">Home</FooterLink>
              </FooterLinkItem>
              <FooterLinkItem>
                <FooterLink to="/projects">Projects</FooterLink>
              </FooterLinkItem>
              <FooterLinkItem>
                <FooterLink 
                  to="/#contact" 
                  onClick={handleContactClick}
                >
                  Contact
                </FooterLink>
              </FooterLinkItem>
            </FooterLinksList>
          </nav>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Contact Info</FooterTitle>
          <FooterText>
            <i className="fas fa-envelope" 
               style={{ marginRight: '10px' }} 
               aria-hidden="true"
            ></i>
            <ExternalLink 
              href="mailto:godfrey.antomarlin@gmail.com"
              aria-label="Send email to godfrey.antomarlin@gmail.com"
            >
              godfrey.antomarlin@gmail.com
            </ExternalLink>
          </FooterText>
          <FooterText>
            <i className="fas fa-map-marker-alt" 
               style={{ marginRight: '10px' }} 
               aria-hidden="true"
            ></i>
            <span>Edinburgh, United Kingdom</span>
          </FooterText>
        </FooterSection>
      </FooterContent>
      
      <FooterBottom>
        <Copyright>
          &copy; {currentYear} Godfrey Antomarlin. All Rights Reserved.
        </Copyright>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;