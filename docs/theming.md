---
title: Theming
layout: home
nav_order: 4
---

# Theming

The Product-led library allows users to customize the look and feel of its components. It provides a default theme that can be easily overridden or changed to suit specific requirements.

## Default Theme

The library's default theme consists of the following properties:

```typescript
export const defaultTheme: Theme = {
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
    infoColor: '#3498db',
};
```

## Overriding the Default Theme

You can override the default theme by using CSS variables. To change specific properties, simply define your custom values in your CSS file.

Example:

```css
:root {
    --primaryColor: #473ce7;
}
```

In this example, the primaryColor is set to a new value.

## Programmatically Changing the Theme

To dynamically update the theme in your application, use the following method:

```typescript
Productled.getInstance().applyCustomTheme(customTheme: Partial<Theme>);
```

This method allows you to pass a custom theme object to override the default or previously applied theme properties. You only need to provide the properties you want to change.