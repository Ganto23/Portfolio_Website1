import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ProjectCarousel from '../components/projects/ProjectCarousel';
import ProjectsGrid from '../components/projects/ProjectsGrid';

/**
 * Styled components for Projects page
 */
const ProjectsPageContainer = styled.div`
  background: ${props => props.theme.colors.white};
  min-height: 100vh;
  padding-top: 100px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(
      90deg, 
      ${props => props.theme.colors.mauve}40, 
      ${props => props.theme.colors.lavender}, 
      ${props => props.theme.colors.orchid}, 
      ${props => props.theme.colors.mauve}40
    );
  }
`;

const ProjectsHeader = styled.div`
  max-width: 900px;
  margin: 0 auto 60px;
  text-align: center;
  padding: 0 20px;
`;

const ProjectsTitle = styled.h1`
  font-size: 40px;
  margin-bottom: 20px;
  color: ${props => props.theme.colors.black};
  position: relative;
  padding-bottom: 15px;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: linear-gradient(
      90deg, 
      ${props => props.theme.colors.orchid}, 
      ${props => props.theme.colors.lavender}
    );
  }
`;

const ProjectsSubtitle = styled.p`
  font-size: 18px;
  color: ${props => props.theme.colors.black}CC;
  line-height: 1.6;
  max-width: 700px;
  margin: 0 auto;
`;

const ViewToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
`;

const ViewToggleButton = styled.button`
  background: ${props => props.active ? props.theme.colors.orchid : 'transparent'};
  color: ${props => props.active ? props.theme.colors.white : props.theme.colors.black};
  border: 2px solid ${props => props.active ? props.theme.colors.orchid : props.theme.colors.mauve};
  padding: 10px 25px;
  margin: 0 10px;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 600;
  transition: ${props => props.theme.transitions.standard};
  
  &:hover {
    background: ${props => props.active ? props.theme.colors.orchid : props.theme.colors.mauve}30;
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.small};
  }
  
  &:focus {
    outline: 2px solid ${props => props.theme.colors.lavender};
    outline-offset: 2px;
  }
`;

const BackgroundPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="${encodeURIComponent('#d3b1c2')}" fill-opacity="0.05" fill-rule="evenodd"%3E%3Ccircle cx="3" cy="3" r="3"/%3E%3Ccircle cx="13" cy="13" r="3"/%3E%3C/g%3E%3C/svg%3E');
  z-index: -1;
`;

/**
 * ViewToggle component for switching between carousel and grid views
 * 
 * @param {Object} props - Component props
 * @param {string} props.activeMode - Current active view mode
 * @param {Function} props.onChange - Callback for view mode change
 */
const ViewToggle = ({ activeMode, onChange }) => (
  <ViewToggleContainer role="group" aria-label="Change project view mode">
    <ViewToggleButton 
      active={activeMode === 'carousel'} 
      onClick={() => onChange('carousel')}
      aria-pressed={activeMode === 'carousel'}
    >
      <i className="fas fa-film" aria-hidden="true"></i>
      {' '}Carousel View
    </ViewToggleButton>
    <ViewToggleButton 
      active={activeMode === 'grid'} 
      onClick={() => onChange('grid')}
      aria-pressed={activeMode === 'grid'}
    >
      <i className="fas fa-th" aria-hidden="true"></i>
      {' '}Grid View
    </ViewToggleButton>
  </ViewToggleContainer>
);

// PropTypes for ViewToggle component
ViewToggle.propTypes = {
  activeMode: PropTypes.oneOf(['carousel', 'grid']).isRequired,
  onChange: PropTypes.func.isRequired
};

/**
 * Projects page component
 * Displays a collection of portfolio projects with toggleable view modes
 */
const Projects = () => {
  // State for tracking current view mode (carousel or grid)
  const [viewMode, setViewMode] = useState('carousel');

  // Handler for view mode change
  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    // Announce view mode change to screen readers
    const message = `Switched to ${mode} view`;
    
    // Use aria-live to announce the change
    const announcement = document.getElementById('view-mode-announcement');
    if (announcement) {
      announcement.textContent = message;
    }
  };

  return (
    <ProjectsPageContainer>
      <BackgroundPattern />
      
      {/* Hidden element for screen reader announcements */}
      <div 
        id="view-mode-announcement" 
        aria-live="polite" 
        className="sr-only"
        style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden' }}
      />
      
      <ProjectsHeader>
        <ProjectsTitle>My Portfolio</ProjectsTitle>
        <ProjectsSubtitle>
          A collection of projects I've worked on, showcasing my skills in web development,
          data analysis, and AI integration. Each project represents different challenges
          and solutions I've implemented.
        </ProjectsSubtitle>
      </ProjectsHeader>
      
      <ViewToggle 
        activeMode={viewMode} 
        onChange={handleViewModeChange}
      />
      
      {viewMode === 'carousel' ? (
        <ProjectCarousel title="Featured Projects" />
      ) : (
        <ProjectsGrid title="All Projects" />
      )}
    </ProjectsPageContainer>
  );
};

export default Projects;