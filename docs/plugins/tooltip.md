---
title: Spotlights
parent: Plugins
nav_order: 2
---

# Tooltip Plugin Documentation

The Tooltip Plugin provides a way to display helpful tooltips to users when they hover over specific elements in your application. This guide covers the installation and configuration steps to get the Tooltip plugin working with Productled.

## Installation
Ensure that the Productled core is installed before adding the Tooltip plugin. If you haven't installed the core library, follow the Productled Installation Guide.

To install the Tooltip plugin, run:

``` bash
npm install @productled/tooltip
```

Then, register the Tooltip plugin in your application file:

```typescript
import productledConf from './productled-config.json';
import { Productled } from '@productled/core';
import { TooltipPlugin } from '@productled/tooltip';

// Get the Productled instance
const productled = Productled.getInstance();

// Load the configuration
productled.loadConfig(productledConf);

// Register the plugin
productled.registerPlugin(new TooltipPlugin());
```

## Configuring Tooltips

Once installed, configure tooltips through the productled-conf.json file.

Example configuration for a tooltip:

```json
{
    "hooks": [
        {
            "plugin": "tooltip",
            "trigger": {
                "url": "/page/subpage*",
                "selector": ".hover-me",
                "frequency": "always"
            },
            "config": {
                "title": "Tooltip Title",
                "description": "This is a helpful tooltip description.",
                "link": "https://learn-more-link.com",
            }
        }
    ]
}
```

Explanation of Configuration:

- plugin: Specifies the tooltip plugin.
- trigger: Defines the conditions for displaying the tooltip (e.g., URL, element selector, frequency).
- config: Contains the tooltip's title, description, link, and positioning.
Using Tooltips

After configuring the tooltips, the Productled core automatically handles the display based on the defined conditions. You can create multiple tooltips for different elements across your application.
