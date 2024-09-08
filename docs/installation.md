---
title: Installation
layout: home
nav_order: 2
---

# Installation Guide 

{: .no_toc }

Welcome to the Productled Library Installation Guide. This guide will walk you through the process of setting up and configuring the Productled Library in your project. By following these steps, you'll be able to leverage the powerful features provided by Productled to enhance your application's user experience.

## Table of contents

{: .no_toc .text-delta }

1. TOC
{:toc}

## Install the Core Package

To get started, you need to install the core Productled library. This library is the foundation for all Productled functionalities.

```bash
npm install @productled/core
```

## Install the Plugins

Productled offers a variety of plugin libraries to extend its capabilities. You can choose and install the plugins that best suit your needs. For example, to install the Spotlight plugin:

```bash
npm install @productled/spotlights
```

Repeat this step for any other plugins you wish to use.

## Create a Configuration File

Next, you need to create a configuration file where you'll define the features and plugins for Productled. This file should be placed in your src directory.

File: src/productled-config.json

```json
{
    "spotlights": []
}
```

In this configuration file, you'll specify the settings and options for the plugins you're using. For now, we've included an empty array for spotlights, but you'll populate this with your spotlight definitions later.

## Initialize at Application Start

To start using Productled in your application, you'll need to initialize it at the beginning of your app's lifecycle. This is typically done in the entry point file of your application, such as index.tsx for React projects.

E.g., file: index.tsx

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

In this example, we're initializing the Productled instance, loading the configuration from productled-config.json, and registering the SpotlightPlugin plugin. You can register additional plugins similarly.

## Further Configuration and Plugin Usage

Once you've completed the initial setup, you can start configuring and using the plugins you've installed. Each plugin may have its own specific configuration options, which you'll add to your productled-config.json file. Be sure to consult the documentation for each plugin to understand how to fully utilize its features.