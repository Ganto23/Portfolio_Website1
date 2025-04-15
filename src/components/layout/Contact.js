import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import apiService from '../../services/api';

// Styled components
const ContactSection = styled.section`
  padding: 80px 0;
  background-color: ${props => props.theme.colors.black};
  color: ${props => props.theme.colors.white};
`;

const ContactContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px;
`;

const ContactTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: ${props => props.theme.colors.mauve};
`;

const ContactSubTitle = styled.p`
  text-align: center;
  font-size: 1.2rem;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  color: ${props => props.theme.colors.lavender};
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
  grid-column: ${props => props.fullWidth ? '1 / span 2' : 'auto'};
  
  @media (max-width: 768px) {
    grid-column: 1;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: ${props => props.theme.colors.mauve};
`;

const InputError = styled.div`
  color: #f44336;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid ${props => props.error 
    ? '#f44336' 
    : `${props.theme.colors.orchid}50`};
  border-radius: ${props => props.theme.borderRadius.medium};
  background-color: ${props => props.theme.colors.black};
  color: ${props => props.theme.colors.white};
  font-size: 1rem;
  transition: ${props => props.theme.transitions.standard};
  
  &:focus {
    outline: none;
    border-color: ${props => props.error 
      ? '#f44336' 
      : props.theme.colors.orchid};
    box-shadow: 0 0 0 2px ${props => props.error 
      ? '#f4433630' 
      : `${props.theme.colors.orchid}30`};
  }

  &::placeholder {
    color: ${props => props.theme.colors.white}70;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid ${props => props.error 
    ? '#f44336' 
    : `${props.theme.colors.orchid}50`};
  border-radius: ${props => props.theme.borderRadius.medium};
  background-color: ${props => props.theme.colors.black};
  color: ${props => props.theme.colors.white};
  font-size: 1rem;
  resize: vertical;
  min-height: 150px;
  font-family: inherit;
  transition: ${props => props.theme.transitions.standard};
  
  &:focus {
    outline: none;
    border-color: ${props => props.error 
      ? '#f44336' 
      : props.theme.colors.orchid};
    box-shadow: 0 0 0 2px ${props => props.error 
      ? '#f4433630' 
      : `${props.theme.colors.orchid}30`};
  }

  &::placeholder {
    color: ${props => props.theme.colors.white}70;
  }
`;

const SubmitButton = styled.button`
  grid-column: 1 / span 2;
  padding: 12px 20px;
  background-color: ${props => props.theme.colors.orchid};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.medium};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: ${props => props.theme.transitions.standard};
  border: 2px solid ${props => props.theme.colors.orchid};
  
  &:hover {
    background-color: transparent;
    color: ${props => props.theme.colors.orchid};
  }
  
  &:disabled {
    background-color: ${props => props.theme.colors.mediumGray};
    cursor: not-allowed;
    opacity: 0.7;
    border-color: ${props => props.theme.colors.mediumGray};
  }
  
  @media (max-width: 768px) {
    grid-column: 1;
  }
`;

const ResponseMessage = styled.div`
  grid-column: 1 / span 2;
  padding: 15px;
  margin-top: 15px;
  border-radius: ${props => props.theme.borderRadius.medium};
  text-align: center;
  
  background-color: ${props => props.success ? '#4caf5020' : '#f4433620'};
  border: 1px solid ${props => props.success ? '#4caf50' : '#f44336'};
  color: ${props => props.success ? '#4caf50' : '#f44336'};
  
  @media (max-width: 768px) {
    grid-column: 1;
  }
`;

/**
 * Contact component with form functionality
 * Handles user input, validation, and submission to API
 */
const Contact = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  // Form processing state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [response, setResponse] = useState(null);
  
  // Form validation state
  const [errors, setErrors] = useState({});
  
  // Form event handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Clear errors when field is corrected
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
    
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setResponse(null);
    
    try {
      const res = await apiService.sendContactForm(formData);
      
      if (res.success) {
        // Reset form on success
        setResponse({
          success: true,
          message: 'Thank you for your message! I will get back to you soon.'
        });
        
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        setResponse({
          success: false,
          message: res.error || 'Something went wrong. Please try again.'
        });
      }
    } catch (error) {
      setResponse({
        success: false,
        message: 'Something went wrong. Please try again.'
      });
      console.error('Contact form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <ContactSection id="contact">
      <ContactContainer>
        <ContactTitle>Get In Touch</ContactTitle>
        <ContactSubTitle>
          Have a question or want to work together? 
          Leave a message and I'll get back to you as soon as possible.
        </ContactSubTitle>
        
        <Form onSubmit={handleSubmit} noValidate aria-label="Contact form">
          <FormGroup>
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              required
              aria-required="true"
              aria-invalid={!!errors.name}
              error={!!errors.name}
            />
            {errors.name && <InputError role="alert">{errors.name}</InputError>}
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email address"
              required
              aria-required="true"
              aria-invalid={!!errors.email}
              error={!!errors.email}
            />
            {errors.email && <InputError role="alert">{errors.email}</InputError>}
          </FormGroup>
          
          <FormGroup fullWidth>
            <Label htmlFor="subject">Subject</Label>
            <Input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject of your message"
              required
              aria-required="true"
              aria-invalid={!!errors.subject}
              error={!!errors.subject}
            />
            {errors.subject && <InputError role="alert">{errors.subject}</InputError>}
          </FormGroup>
          
          <FormGroup fullWidth>
            <Label htmlFor="message">Message</Label>
            <TextArea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message"
              required
              aria-required="true"
              aria-invalid={!!errors.message}
              error={!!errors.message}
            />
            {errors.message && <InputError role="alert">{errors.message}</InputError>}
          </FormGroup>
          
          <SubmitButton 
            type="submit" 
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </SubmitButton>
          
          {response && (
            <ResponseMessage 
              success={response.success}
              role="status"
              aria-live="polite"
            >
              {response.message}
            </ResponseMessage>
          )}
        </Form>
      </ContactContainer>
    </ContactSection>
  );
};

export default Contact;