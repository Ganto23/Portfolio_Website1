import axios from 'axios';

// Configure API URL from environment variables
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';

// Configure axios to include credentials and CSRF token
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

// Check if we should use mock data (development mode or explicitly requested)
const shouldUseMockData = 
  process.env.REACT_APP_USE_MOCK_DATA === 'true' || 
  process.env.NODE_ENV === 'development';

/**
 * Import mock data from a separate file when needed
 * @returns {Promise<Object|null>} Mock data object or null
 */
const getMockData = async () => {
  if (shouldUseMockData) {
    return import('./mockData').then(module => module.default);
  }
  return null;
};

const apiService = {
  /**
   * Get all projects from the API
   * @returns {Promise<Array>} A promise that resolves to an array of projects
   */
  getProjects: async () => {
    try {
      // For development or when explicitly configured, return mock data
      if (shouldUseMockData) {
        console.log('Using mock project data');
        const mockData = await getMockData();
        return mockData.projects;
      }
      
      const response = await axios.get(`${API_URL}/projects/`);
      return response.data;
    } catch (error) {
      console.error("Error fetching projects:", error);
      
      // Fallback to mock data if API call fails
      console.log("Falling back to mock data");
      const mockData = await getMockData();
      return mockData.projects;
    }
  },

  /**
   * Get a single project by ID
   * @param {number|string} id - Project ID
   * @returns {Promise<Object|null>} A promise that resolves to a project object or null
   */
  getProjectById: async (id) => {
    try {
      // For development or when explicitly configured, return mock data
      if (shouldUseMockData) {
        console.log('Using mock project data for id:', id);
        const mockData = await getMockData();
        const project = mockData.projects.find(p => p.id === parseInt(id));
        return project || null;
      }
      
      const response = await axios.get(`${API_URL}/projects/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching project with id ${id}:`, error);
      
      // Fallback to mock data if API call fails
      const mockData = await getMockData();
      const project = mockData.projects.find(p => p.id === parseInt(id));
      return project || null;
    }
  },

  /**
   * Send contact form data to the API
   * @param {Object} formData - Contact form data (name, email, subject, message)
   * @returns {Promise<Object>} A promise that resolves to the API response with success status
   */
  sendContactForm: async (formData) => {
    try {
      const response = await axios.post(`${API_URL}/contact/`, formData);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error("Error sending contact form:", error);
      
      // Enhanced error reporting
      const errorMessage = error.response?.data?.error || 
                         error.response?.data?.message || 
                         error.response?.statusText ||
                         error.message ||
                         'An error occurred while sending your message';
                         
      return {
        success: false,
        error: errorMessage
      };
    }
  }
};

export default apiService;