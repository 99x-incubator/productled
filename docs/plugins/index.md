---
title: Plugins
nav_order: 3
has_children: true
---

# Plugins

Productled offers a variety of plugin libraries to extend its capabilities. You can choose and install the plugins that best suit your needs. For example, to install the Spotlight plugin:

```bash
npm install @productled/<plugin-name>
```

e.g.,

```bash
npm install @productled/spotlights
```

Register the plugin with Productled Core at application start. e.g., in file: index.tsx

``` typescript
productled.registerPlugins(...plugins: Plugin[]);
```

e.g.,

``` typescript
productled.registerPlugins(new SpotlightPlugin());
```

## Available Plugins

- [Spotlight Plugin documentation](spotlight)
- [Tooltip Plugin documentation](tooltip)
