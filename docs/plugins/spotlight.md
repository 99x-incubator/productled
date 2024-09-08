---
title: Spotlights
parent: Plugins
nav_order: 2
---

# Spotlights Plugin

The Spotlights plugin is a powerful tool that allows you to create in-app spotlights to guide users through new features, highlight important UI elements. This guide will walk you through the installation process and show you how to configure the Spotlights plugin within Productled.

## Installation

To get started with the Spotlights plugin, you need to install it into your Productled project. First, ensure that you have already installed the core Productled library. If you haven't done so, follow the [Productled Installation Guide](../installation) first.

Once the core library is installed, you can install the Spotlights plugin using npm:

```bash
npm install @productled/spotlights
```

Now, you need to register the Spotlights plugin with the Productled core at the start of your application. This can be done in your main application file (e.g., `index.tsx`):

```typescript
import productledConf from './productled-config.json';
import { Productled } from '@productled/core';
import { SpotlightPlugin } from '@productled/spotlights';

// Get the Productled instance
const productled = Productled.getInstance();

// Load the configuration
productled.loadConfig(productledConf);

// Register the plugins
productled.registerPlugin(new SpotlightPlugin());
```

## Configuring Spotlights

After installing the Spotlights plugin, you need to configure it within your `productled-conf.json` file. This configuration file defines the behavior and settings for your spotlights.

Below is an example configuration for a spotlight:

Example File: `src/productled-conf.json`

```json
{
    "hooks": [
        {
            "plugin": "spotlight",
            "trigger": {
                "url": "/page/subpage*",
                "selector": ".spot-me",
            
                "frequency": "always",
                "schedule": {
                    "start": { "year": "2024","month": "04", "date": "01", "time": "09:00" },
                    "end": { "year": "2024", "month": "12", "date": "01", "time": "09:00" }
                }
            },
            "config": {
                "title": "New Feature",
                "description": "Just release today. Click me to learn more.",
                "link": "https://plugin-link.com",
                "positioning": {
                    "left": "60",
                    "top": "10"
                }
            }
        }
    ]
}
```

Explanation of Configuration:
In this example, the spotlight will be displayed on the URL `/page/subpage*` whenever an element with the class `.spot-me` is present. The spotlight will have a title, description, and a link to learn more about the feature. The spotlight will be positioned at `left: 60` and `top: 10` on the screen.

- **`plugin`**: The key of the plugin, which is set to `"spotlight"`.
- **`trigger`**: The trigger object that defines when the spotlight should be displayed. It includes the URL pattern, selector, frequency, and schedule.
- **`config`**: The configuration object that defines the spotlight's title, description, link, and positioning.

## Using the Spotlight

After configuring the spotlight in `productled-conf.json`, the Productled core will handle the activation and display of the spotlight according to the defined triggers and schedule. You can add multiple spotlights to the configuration file, each with its own unique settings.
