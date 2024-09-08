import { Theme } from './ThemeManager';

const basicTheme: Theme = {
  primaryColor: '#3498db',
  secondaryColor: '#2ecc71',
  backgroundColor: '#ffffff',
  textColor: '#333333',
  fontSize: '16px',
  fontFamily: 'Arial, sans-serif',
  borderRadius: '4px',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  spacing: '8px',
  linkColor: '#2980b9',
  errorColor: '#e74c3c',
  successColor: '#2ecc71',
  warningColor: '#f39c12',
  infoColor: '#3498db'
};

const scandinavianTheme: Theme = {
  primaryColor: '#4A5D23', // Deep olive green
  secondaryColor: '#B4B8AB', // Muted stone grey
  backgroundColor: '#F5F5F1', // Soft off-white
  textColor: '#2F2E2D', // Warm dark grey
  fontSize: '16px',
  fontFamily: 'Roboto, sans-serif', // Clean, modern font
  borderRadius: '4px', // Simple sharp edges for minimalist style
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)', // Very light shadow for minimal depth
  spacing: '8px',
  linkColor: '#577590', // Muted slate blue
  errorColor: '#C85454', // Reserved brick red
  successColor: '#739973', // Calm moss green
  warningColor: '#D9A650', // Warm ochre
  infoColor: '#4A5D23' // Matches primary color
};


export { scandinavianTheme as defaultTheme };