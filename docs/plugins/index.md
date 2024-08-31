---
title: Plugins
nav_order: 3
---

# Plugins

Productled offers a variety of plugin libraries to extend its capabilities. You can choose and install the plugins that best suit your needs. For example, to install the Spotlight plugin:

```bash
npm install @productled/<plugin-name>
```

Register the plugin with Productled Core at application start.

e.g., in file: index.tsx
``` typescript
productled.registerPlugin(new SpotlightPlugin());
```

## Available Plugins

- [Spotlights Plugin documentation](spotlights)
