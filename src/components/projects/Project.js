import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Styled components
const ProjectCard = styled.div`
  background-color: ${props => props.theme.colors.lavender};
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: ${props => props.theme.shadows.medium};
  padding: 20px;
  margin: 10px;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: ${props => props.theme.transitions.standard};
  border: 1px solid ${props => props.theme.colors.mauve};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.large};
  }
`;

const ProjectTitle = styled.h3`
  font-size: 24px;
  margin-bottom: 15px;
  color: ${props => props.theme.colors.black};
  position: relative;
  padding-bottom: 10px;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 3px;
    background-color: ${props => props.theme.colors.orchid};
  }
`;

const ProjectDescription = styled.p`
  flex-grow: 1;
  margin-bottom: 15px;
  color: ${props => props.theme.colors.darkGray};
  line-height: 1.6;
`;

const TechnologiesList = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const TechTag = styled.span`
  background-color: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.orchid};
  color: ${props => props.theme.colors.black};
  border-radius: 16px;
  padding: 5px 10px;
  display: inline-block;
  font-size: 14px;
  font-weight: 500;
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: ${props => props.theme.borderRadius.small};
  margin-bottom: 15px;
`;

const GithubLink = styled.a`
  display: inline-block;
  background-color: ${props => props.theme.colors.orchid};
  color: white;
  padding: 10px 15px;
  border-radius: ${props => props.theme.borderRadius.small};
  text-decoration: none;
  font-weight: 600;
  transition: ${props => props.theme.transitions.standard};
  text-align: center;
  border: 2px solid ${props => props.theme.colors.orchid};
  
  &:hover {
    background-color: transparent;
    color: ${props => props.theme.colors.orchid};
  }
`;

/**
 * Project component displays an individual portfolio project
 * 
 * @param {Object} props - Component props
 * @param {Object} props.project - Project data object
 */
const Project = ({ project }) => {
  // Parse technologies string to array (or use technologies_list from API if available)
  const techArray = project.technologies_list || 
    (project.technologies 
      ? project.technologies.split(',').map(tech => tech.trim())
      : []);

  return (
    <ProjectCard>
      {project.image && (
        <ProjectImage 
          src={project.image} 
          alt={`${project.name} screenshot`} 
          loading="lazy"
          onError={(e) => {
            console.warn(`Failed to load image for ${project.name}`);
            e.target.style.display = 'none';
          }}
        />
      )}
      <ProjectTitle>{project.name}</ProjectTitle>
      <ProjectDescription>{project.description}</ProjectDescription>
      
      <TechnologiesList>
        {techArray.map((tech, index) => (
          <TechTag key={index}>{tech}</TechTag>
        ))}
      </TechnologiesList>
      
      <GithubLink 
        href={project.github_url} 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label={`View ${project.name} on GitHub`}
      >
        View on GitHub
      </GithubLink>
    </ProjectCard>
  );
};

// Prop type validation
Project.propTypes = {
  project: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    technologies: PropTypes.string,
    technologies_list: PropTypes.arrayOf(PropTypes.string),
    github_url: PropTypes.string.isRequired,
    image: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
  }).isRequired
};

export default Project;