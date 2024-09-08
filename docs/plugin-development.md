---
title: Installation
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
    ...
  "workspaces": [
    "packages/@productled/core",
    "packages/@productled/spotlights",
    "packages/samples/react-sample",
    <add new plugin path here>
  ],
    ...
}
```

Now in the new plugin folder, create a file called `package.json` with the following content:

```json
{
    "name": "@productled/tooltips",
    "version": "1.0.0",
    "main": "dist/index.js",
    "types": "dist/index.d.ts",

    "scripts": {
      "build": "tsc",
      "test": "jest",
      "clean": "rm -rf dist"
    },
    "dependencies": {

    },
    "devDependencies": {
      "@types/node": "^20.14.9",
      "ts-node": "^10.9.2",
      "typescript": "^4.9.5"
    }
}
```

In the new plugin folder, create a `tsconfig.json` file with the following content:

```json
{
    "extends": "../../../tsconfig.json",
    "compilerOptions": {
      "outDir": "dist",
      "rootDir": "src",
      "lib": ["ESNext", "DOM"],
      "module": "ESNext",
      "target": "ESNext",
      "moduleResolution": "node",
      "esModuleInterop": true,
      "declaration": true, // set to true on prod
      "sourceMap": true, // set to true on dev
      "strict": true,
      "types": ["node"]
    },
    "include": ["src/**/*"]
}
```

### Create the Source Files

In the new plugin folder, create a `src` folder and add an `index.ts` and `pluginClass.ts` file with the following content:

`index.ts`

```typescript
export { default as PluginClass } from './PluginClass';
```

`PluginClass.ts`

```typescript
import { Plugin } from '@productled/core';

export class PluginClass implements Plugin {
    private key: string = "plugin-name";

    get Name(): string {
        return this.key;
    }

    create(element: HTMLElement, conf: any, theme: Theme): void {
        if (element) {
            // Apply the plugin effect on the specified HTML element
        }
    }

    removeAll(): void {
        const spotlights = document.querySelectorAll('.productled-' + this.key);
        spotlights.forEach(spotlight => {
            spotlight.remove();
        });
    }
}
```

### The `create` Method

```typescript
create(element: HTMLElement, conf: any, theme: Theme): void {
    if (element) {
        // Apply the plugin effect on the specified HTML element
    }
}
```

The `create` method takes three parameters: `element`, `conf`, and `theme`. Here's what each parameter represents:

- **`element`** is of type `HTMLElement`. It represents the HTML element on which the plugin will create the effect.
- **`conf`** is of type `any`. It represents the configuration object that contains properties specified in the `productled-config.json` file. These properties will be used to customize the effect created by the plugin.
- **`theme`** is of type `Theme`. It represents the theme object that will be used to style the effect created by the plugin.

In summary, the `create` method is responsible for creating an effect on a specified HTML element. It uses the provided configuration and theme to customize the spotlight's appearance and behavior.

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
