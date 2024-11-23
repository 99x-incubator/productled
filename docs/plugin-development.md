---
title: Plugin Development
layout: home
nav_order: 5
---

# Plugin Development

Plugins are the building blocks of ProductLed. They are responsible for creating interactive effects on web pages to guide users through the product experience. Plugins can be used to highlight specific elements, display tooltips, show modals, and more.

## Plugin Structure

To get started, create a new folder in packages/@productled folder with the name of the plugin.

in the solution root's package.json add an new entry to the workspaces array with the path to the new plugin folder.

```json
{
  "workspaces": [
    "packages/@productled/new-plugin-path
  ],
}
```

Now in the new plugin folder, create a file called `package.json` with the following content:

```json
{
    "name": "@productled/<plugin-name>",
    "version": "1.0.0",
    "main": "dist/index.js",
    "types": "dist/index.d.ts",

    "scripts": {
      "build": "tsc",
      "test": "jest",
      "clean": "rm -rf dist"
    },
    "dependencies": {
        // plugin specific dependencies
    },
    "devDependencies": {
        // plugin sppecific dev dependencies
    }
}
```

In the new plugin folder, create a `tsconfig.json` file with the following content:

```json
{
    "extends": "../../../tsconfig.base.json",
    "compilerOptions": {
        "outDir": "dist"
    },
    "include": [
        "src/**/*"
    ],
    "references": [
        {
            "path": "../core"
        }
        // add other plugin dependency references
    ]
}
```

### Create the Source Files

In the new plugin folder, create a `src` folder and add an `index.ts` and `PluginClass.ts` file with the following content:

`index.ts`

```typescript
export { default as PluginClass } from './PluginClass';
```

`PluginClass.ts`

```typescript
import type { Plugin } from '@productled/core';

export class PluginClass implements Plugin {
    private key: string = "plugin-name";

    get Name(): string {
        return this.key;
    }

    initialize(hooks: Hook[], theme: Theme): void {
        // Initialize plugin effects based on configruations
    }

    removeAll(): void {
       // Remove all plugin instances from DOM
    }
}
```

### The `initialize` Method

```typescript
initialize(hooks: Hook[], theme: Theme): void {
    // Initialize plugin effects based on configruations
}
```

The `initialize` method takes two parameters: `hooks`, and `theme`. Here's what each parameter represents:

- **`hooks`** is of type `Hook[]`. It represents the configuration objects that contains properties specified in the `productled-config.json` file. These properties will be used to customize the effect created by the plugin.
- **`theme`** is of type `Theme`. It represents the theme object that will be used to style the effect created by the plugin.

In summary, the `initilaize` method is responsible for creating effects for a specific plugin on a specific route. It uses the provided configurations and theme to customize the spotlight's appearance and behavior.

### The `removeAll` Method

This method removes all the plugin instances created by the plugin. It selects all elements with the class `productled-pluginName` (where `pluginName` is the key of the plugin) and removes them from the DOM.

### The `Name` Property

The `Name` property is a getter method that returns the key of the plugin. This key is used to identify the plugin and differentiate it from other plugins. In this case, the key is set to `"plugin-name"`.

## Registering the Plugin

To register the plugin with the ProductLed library, you need to add it to the `productled-config.json` file in your project. Here's an example of how you can add the plugin to the configuration file:

```json
{
    "hooks": [
        {
            "plugin": "plugin-name",
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
                "title": "Plugin Title",
                "description": "Plugin Description",
                "link": "https://plugin-link.com",
                "positioning": {
                    "alignment": "right-center",
                    "left": "60",
                    "top": "10"
                }
            }
        }
    ]
}
```

You may use the sample projects in the `packages/samples` folder to test your plugin.
