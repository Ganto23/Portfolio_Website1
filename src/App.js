import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Header from './components/layout/Header';
import Introduction from './components/layout/Introduction';
import ProjectCarousel from './components/projects/ProjectCarousel';
import Contact from './components/layout/Contact';
import Footer from './components/layout/Footer';
import Projects from './pages/Projects';
import theme from './styles/theme';
import './App.css';

// Global styles using styled-components
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  html {
    scroll-behavior: smooth;
  }
  
  body {
    font-family: ${props => props.theme.fonts.primary};
    line-height: 1.6;
    color: ${props => props.theme.colors.black};
    background-color: ${props => props.theme.colors.white};
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${props => props.theme.colors.black};
  }

  a {
    color: ${props => props.theme.colors.orchid};
    text-decoration: none;
    transition: ${props => props.theme.transitions.standard};
    
    &:hover {
      color: ${props => props.theme.colors.lavender};
    }
  }

  button {
    cursor: pointer;
    transition: ${props => props.theme.transitions.standard};
  }

  /* Font Awesome for icons */
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');
`;

/**
 * Home page component
 * Renders the main landing page with Introduction, ProjectCarousel and Contact sections
 */
const Home = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Handle automatic scrolling to contact section if redirected with state
    if (location.state?.scrollToContact) {
      setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); // Small delay to ensure the component is mounted
    }
  }, [location]);

  return (
    <>
      <Introduction />
      <section id="projects">
        <ProjectCarousel />
      </section>
      <Contact />
    </>
  );
};

/**
 * Main App component
 * Sets up routing and global theme provider
 */
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <GlobalStyle />
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
