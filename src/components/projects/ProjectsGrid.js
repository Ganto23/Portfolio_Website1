import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Project from './Project';
import apiService from '../../services/api';

/**
 * Styled components for the projects grid
 */
const GridSection = styled.section`
  background: ${props => props.theme.colors.white};
  padding: 20px 0 80px;
  position: relative;
`;

const GridContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const GridTitle = styled.h2`
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
    background: linear-gradient(
      90deg, 
      ${props => props.theme.colors.orchid}, 
      ${props => props.theme.colors.lavender}
    );
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
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
  
  &:focus {
    outline: 2px solid ${props => props.theme.colors.lavender};
    outline-offset: 2px;
  }
`;

const NoProjectsMessage = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: ${props => props.theme.colors.black}AA;
  background-color: ${props => props.theme.colors.white}80;
  border-radius: ${props => props.theme.borderRadius.medium};
  margin: 20px 0;
  border: 1px dashed ${props => props.theme.colors.mauve}60;
`;

/**
 * ProjectsGrid component
 * Displays projects in a responsive grid layout
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Title to display above the grid
 */
const ProjectsGridComponent = ({ title = "All Projects" }) => {
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
      <GridSection>
        <GridContainer>
          <GridTitle>{title}</GridTitle>
          <LoadingMessage aria-live="polite">
            <i className="fas fa-spinner fa-pulse" aria-hidden="true"></i> Loading projects...
          </LoadingMessage>
        </GridContainer>
      </GridSection>
    );
  }

  // Display error with retry button
  if (error) {
    return (
      <GridSection>
        <GridContainer>
          <GridTitle>{title}</GridTitle>
          <ErrorMessage role="alert">
            <i className="fas fa-exclamation-triangle" aria-hidden="true"></i> {error}
            <div>
              <RetryButton onClick={fetchProjects}>
                <i className="fas fa-sync" aria-hidden="true"></i> Retry
              </RetryButton>
            </div>
          </ErrorMessage>
        </GridContainer>
      </GridSection>
    );
  }

  // No projects found
  if (projects.length === 0) {
    return (
      <GridSection>
        <GridContainer>
          <GridTitle>{title}</GridTitle>
          <NoProjectsMessage>
            <i className="fas fa-folder-open" aria-hidden="true"></i> No projects found. Check back later!
          </NoProjectsMessage>
        </GridContainer>
      </GridSection>
    );
  }

  // Render projects grid
  return (
    <GridSection>
      <GridContainer>
        <GridTitle>{title}</GridTitle>
        <ProjectsGrid aria-label="Projects grid">
          {projects.map(project => (
            <Project key={project.id} project={project} />
          ))}
        </ProjectsGrid>
      </GridContainer>
    </GridSection>
  );
};

// Prop types validation
ProjectsGridComponent.propTypes = {
  title: PropTypes.string
};

export default ProjectsGridComponent;