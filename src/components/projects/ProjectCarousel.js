import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styled from 'styled-components';
import Project from './Project';
import apiService from '../../services/api';

/**
 * Styled components for the carousel section
 */
const CarouselSection = styled.section`
  background: ${props => props.theme.colors.white};
  padding: 80px 0;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, 
      ${props => props.theme.colors.orchid}40, 
      ${props => props.theme.colors.lavender}, 
      ${props => props.theme.colors.mauve}, 
      ${props => props.theme.colors.orchid}40
    );
  }
`;

const CarouselContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px;
`;

const CarouselTitle = styled.h2`
  text-align: center;
  margin-bottom: 40px;
  font-size: 32px;
  color: ${props => props.theme.colors.black};
  position: relative;
  padding-bottom: 15px;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background-color: ${props => props.theme.colors.orchid};
  }
`;

const StyledCarousel = styled(Carousel)`
  .carousel .slide {
    background: transparent;
    padding: 20px;
    min-height: 450px;
  }

  .carousel .control-dots .dot {
    background: ${props => props.theme.colors.orchid};
    box-shadow: none;
    opacity: 0.7;
    
    &.selected {
      opacity: 1;
    }
  }

  .carousel .control-arrow {
    background: ${props => props.theme.colors.black}50;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    margin: auto 20px;
    opacity: 0.7;
    transition: ${props => props.theme.transitions.standard};
    
    &:hover {
      opacity: 1;
      background: ${props => props.theme.colors.orchid}90;
    }
    
    &::before {
      border-color: ${props => props.theme.colors.white};
    }
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: ${props => props.theme.colors.orchid};
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 40px;
  color: #e53935;
  background-color: #ffebee;
  border-radius: ${props => props.theme.borderRadius.medium};
  margin: 20px 0;
`;

const RetryButton = styled.button`
  display: inline-block;
  margin-top: 15px;
  padding: 8px 15px;
  background-color: ${props => props.theme.colors.orchid};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.small};
  cursor: pointer;
  transition: ${props => props.theme.transitions.standard};
  
  &:hover {
    background-color: ${props => props.theme.colors.lavender};
  }
`;

/**
 * ProjectCarousel component
 * Displays a carousel of featured projects loaded from the API
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Title to display above the carousel
 */
const ProjectCarousel = ({ title = "Featured Projects" }) => {
  // State for projects, loading status, and errors
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch projects from API
  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await apiService.getProjects();
      setProjects(data);
    } catch (err) {
      setError('Failed to load projects. Please try again later.');
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch projects on component mount
  useEffect(() => {
    fetchProjects();
  }, []);

  // Display loading indicator
  if (loading) {
    return (
      <CarouselSection>
        <CarouselContainer>
          <CarouselTitle>{title}</CarouselTitle>
          <LoadingMessage aria-live="polite">Loading projects...</LoadingMessage>
        </CarouselContainer>
      </CarouselSection>
    );
  }

  // Display error with retry button
  if (error) {
    return (
      <CarouselSection>
        <CarouselContainer>
          <CarouselTitle>{title}</CarouselTitle>
          <ErrorMessage role="alert">
            {error}
            <div>
              <RetryButton onClick={fetchProjects}>
                Retry
              </RetryButton>
            </div>
          </ErrorMessage>
        </CarouselContainer>
      </CarouselSection>
    );
  }

  // No projects found
  if (projects.length === 0) {
    return (
      <CarouselSection>
        <CarouselContainer>
          <CarouselTitle>{title}</CarouselTitle>
          <LoadingMessage>No projects found.</LoadingMessage>
        </CarouselContainer>
      </CarouselSection>
    );
  }

  // Render carousel with projects
  return (
    <CarouselSection>
      <CarouselContainer>
        <CarouselTitle>{title}</CarouselTitle>
        <StyledCarousel
          showArrows={true}
          infiniteLoop={true}
          showThumbs={false}
          showStatus={false}
          autoPlay={false}
          interval={6000}
          emulateTouch={true}
          swipeable={true}
          dynamicHeight={false}
          stopOnHover={true}
        >
          {projects.map(project => (
            <Project key={project.id} project={project} />
          ))}
        </StyledCarousel>
      </CarouselContainer>
    </CarouselSection>
  );
};

// Prop types validation
ProjectCarousel.propTypes = {
  title: PropTypes.string
};

export default ProjectCarousel;