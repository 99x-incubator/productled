import { defaultTheme } from "../theme/defaultTheme";

export interface Theme {
    primaryColor: string;        // Main color used in buttons, links, etc.
    secondaryColor: string;      // Supporting color for accents or highlights
    backgroundColor: string;     // General background color
    textColor: string;           // Main text color
    fontSize: string;            // Base font size for text
    fontFamily: string;          // Font family for text
    borderRadius: string;        // Rounded corners for UI components
    boxShadow: string;           // Shadow styling for depth
    spacing: string;             // General spacing (padding/margins)
    linkColor: string;           // Color for links
    errorColor: string;          // Color for error messages
    successColor: string;        // Color for success notifications
    warningColor: string;        // Color for warnings
    infoColor: string;           // Color for informational messages
    [key: string]: string;       // Allows additional properties
  }

export class ThemeManager {


    private currentTheme: Theme;

    constructor() {
      this.currentTheme = defaultTheme;
      this.applyTheme();
    }

    public get Theme(): Theme {
        return this.currentTheme;
    }
  
    // Fetch theme values from CSS variables, fallback to default if not found
    getCSSVariable(variable: string): string {
      const value = getComputedStyle(document.documentElement).getPropertyValue(`--${variable}`).trim();
      return value || this.currentTheme[variable];
    }
  
    // Apply the theme, picking from CSS variables or default values
    applyTheme(): void {
      Object.keys(defaultTheme).forEach((key) => {
        const themeValue = this.getCSSVariable(key);
        document.documentElement.style.setProperty(`--${key}`, themeValue);
      });
    }
  
    // Update and apply the theme dynamically
    updateTheme(newTheme: Theme): void {
      Object.keys(newTheme).forEach((key) => {
        this.currentTheme[key] = newTheme[key];
        document.documentElement.style.setProperty(`--${key}`, newTheme[key]);
      });
    }

    /**
     * Applies a new theme by merging it with the default theme and updating CSS variables.
     * @param customTheme Partial theme object to override default theme properties.
     */
    public applyCustomTheme(customTheme: Partial<Theme>): void {
        const newTheme = { ...this.currentTheme, ...customTheme } as Theme;
        this.updateTheme(newTheme);
    }

    /**
     * Resets the theme to the default theme.
     */
    public resetTheme(): void {
        this.updateTheme(defaultTheme);
    }

}
