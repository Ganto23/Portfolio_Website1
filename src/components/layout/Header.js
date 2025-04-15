import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

/**
 * Styled components for header and navigation
 */
const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 1rem 2rem;
  z-index: 1000;
  transition: ${props => props.theme.transitions.standard};
  background-color: ${props => props.scrolled ? props.theme.colors.black : 'transparent'};
  box-shadow: ${props => props.scrolled ? props.theme.shadows.medium : 'none'};
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${props => props.scrolled ? props.theme.colors.mauve : props.theme.colors.white};
  text-decoration: none;

  &:hover {
    color: ${props => props.theme.colors.lavender};
  }
`;

const MenuToggle = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${props => props.scrolled ? props.theme.colors.mauve : props.theme.colors.white};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  
  &:focus {
    outline: 2px solid ${props => props.theme.colors.lavender};
    outline-offset: 2px;
  }
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    gap: 0;
    background-color: ${props => props.theme.colors.black};
    padding: 1rem 0;
    display: ${props => props.isOpen ? 'flex' : 'none'};
    box-shadow: ${props => props.theme.shadows.medium};
  }
`;

const NavLink = styled(Link)`
  color: ${props => props.scrolled ? props.theme.colors.mauve : props.theme.colors.white};
  text-decoration: none;
  padding: 0.5rem;
  position: relative;
  font-weight: 500;
  
  &:hover, &.active {
    color: ${props => props.theme.colors.lavender};
  }
  
  &:focus {
    outline: 2px solid ${props => props.theme.colors.lavender};
    outline-offset: 2px;
  }
  
  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 50%;
    background-color: ${props => props.theme.colors.lavender};
    transition: ${props => props.theme.transitions.standard};
    transform: translateX(-50%);
  }
  
  &:hover::after, &.active::after {
    width: 100%;
  }
  
  @media (max-width: 768px) {
    padding: 1rem 2rem;
    width: 100%;
    text-align: center;
    
    &::after {
      display: none;
    }
    
    &:hover, &.active {
      background-color: ${props => props.theme.colors.orchid};
      color: white;
    }
  }
`;

/**
 * Header component with navigation and responsive menu
 * Includes transparent to solid animation on scroll
 */
const Header = () => {
  // State for header styling and mobile menu
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Hooks for navigation
  const location = useLocation();
  const navigate = useNavigate();
  
  // Handle scroll event to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      if (scrollTop > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Initialize header state on mount
    handleScroll();
    
    // Clean up event listener on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Handle scroll to section when hash changes in URL
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1); // remove the # character
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else if (location.pathname === '/' && !location.hash) {
      // Scroll to top when navigating to homepage without hash
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);
  
  // Close menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);
  
  // Handle click on contact link
  const handleContactClick = (e) => {
    e.preventDefault();
    
    if (location.pathname !== '/') {
      // If not on the homepage, navigate to homepage first, then scroll to contact section
      navigate('/', { state: { scrollToContact: true } });
    } else {
      // If already on homepage, just scroll to contact section
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
    
    // Close the menu if it's open (mobile view)
    if (menuOpen) {
      setMenuOpen(false);
    }
  };
  
  // Toggle mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  return (
    <StyledHeader scrolled={scrolled}>
      <Nav aria-label="Main navigation">
        <Logo to="/" scrolled={scrolled} aria-label="Homepage">
          Godfrey Antomarlin
        </Logo>
        
        <MenuToggle 
          onClick={toggleMenu} 
          scrolled={scrolled}
          aria-expanded={menuOpen}
          aria-controls="nav-links"
          aria-label="Toggle navigation menu"
        >
          <i className={menuOpen ? 'fas fa-times' : 'fas fa-bars'} 
             aria-hidden="true" />
        </MenuToggle>
        
        <NavLinks 
          isOpen={menuOpen} 
          id="nav-links"
          role="menu"
        >
          <NavLink 
            to="/" 
            scrolled={scrolled}
            role="menuitem"
            className={location.pathname === '/' && !location.hash ? 'active' : ''}
          >
            Home
          </NavLink>
          
          <NavLink 
            to="/projects" 
            scrolled={scrolled}
            role="menuitem"
            className={location.pathname === '/projects' ? 'active' : ''}
          >
            Projects
          </NavLink>
          
          <NavLink 
            as="a" 
            href="#contact" 
            onClick={handleContactClick} 
            scrolled={scrolled}
            role="menuitem"
            className={location.hash === '#contact' ? 'active' : ''}
          >
            Contact
          </NavLink>
        </NavLinks>
      </Nav>
    </StyledHeader>
  );
};

export default Header;