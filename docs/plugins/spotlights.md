---
title: Spotlights
parent: Plugins
nav_order: 2
---

# Spotlights Plugin Documentation

The Spotlights plugin is a powerful tool that allows you to create in-app spotlights to guide users through new features, highlight important UI elements. This guide will walk you through the installation process and show you how to configure the Spotlights plugin within Productled.

## Installation

To get started with the Spotlights plugin, you need to install it into your Productled project. First, ensure that you have already installed the core Productled library. If you haven't done so, follow the [Productled Installation Guide](./installation.md) first.

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

File: `src/productled-conf.json`

```json
{
    "spotlights": [{
        "title": "New Click Me Feature",
        "description": "You can now send emails directly from here",
        "link": "http://myblog.com/new_feature_intro",

        "trigger": {
            "url": "/page/subpage",
            "selector": ".spot-me",
        
            "frequency": "always",
            "schedule": {
                "start": { "year": "2024", "month": "04", "date": "01", "time": "09:00" },
                "end": { "year": "2024", "month": "12", "date": "01", "time": "09:00" }
            }
        },
        "positioning": {
            "alignment": "right-center",
            "left": "75",
            "top": "15"
        }
    }]
}
```

Explanation of Configuration:
- `title`: The title of the spotlight. In this example, it's "New Click Me Feature".
- `description`: A brief description of what the spotlight is highlighting. Here, it's "You can now send emails directly from here".
- `link`: A URL that users can follow to learn more about the feature. This could link to a blog post, documentation, or a tutorial. In this example, the link is "http://myblog.com/new_feature_intro".

Trigger Configuration:
- `url`: The specific URL or route where the spotlight should appear. Here, the spotlight is triggered on "/page/subpage".
- `selector`: The CSS selector of the element that the spotlight will highlight. In this example, it targets the element with the class "spot-me".
- `frequency`: Determines how often the spotlight should be shown. Possible values include "always", "once", "daily", etc. Here, it is set to "always".
- `schedule`: Defines the time window during which the spotlight should be active.
  - `start`: The start date and time for the spotlight. In this example, it starts on April 1, 2024, at 09:00.
  - `end`: The end date and time for the spotlight. In this example, it ends on December 1, 2024, at 09:00.

Positioning Configuration:
- `alignment`: Specifies the alignment of the spotlight relative to the selected element. Here, it's set to "right-center".
- `left`: The distance from the left edge of the viewport or element. In this example, it’s set to "75".
- `top`: The distance from the top edge of the viewport or element. In this example, it’s set to "15".

## Using the Spotlight

After configuring the spotlight in `productled-conf.json`, the Productled core will handle the activation and display of the spotlight according to the defined triggers and schedule. You can add multiple spotlights to the configuration file, each with its own unique settings.
