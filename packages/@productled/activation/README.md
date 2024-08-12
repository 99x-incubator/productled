# Implementation Guide

## Install the Required NPM Packages

First, you need to install the core library and the activation sub-module:

```bash
npm install @productled/activation
```

## Spotlights

### Initialize Spotlight Rendering on Route Changes (for React)

To initialize the spotlight capability, you need to add the following code to your application under the context of React Router component:

```typescript
import { Spotlights } from '@productled/activation';

  const location = useLocation();

  useEffect(() => {
    Spotlights.applyEffects();
  }, []);

```

### Load Spotlight definitions declaratively

> **NOTE:** Once the backend service is fully operational, these configurations can be fetched dynamically from a datastore.

Here’s an example configuration:

```typescript
import { Flow, Spotlights } from '@productled/activation';


const spotlightConf: Flow[] = [{
    trigger: {
        url: '/page/subpage',
        element: '.spot-me'
    },
    frequency: 'everytime',
    schedule: {
        start: { date: '31/06/2024', time: '09:00' },
        end: { date: '31/07/2024', time: '09:00' }
    },
    content: {
        title: 'New Feature',
        body: 'You can now send emails directly from here',
        link: 'http://myblog.com/new_feature_intro'
    },
    design: {
        icon: 'new-feature',
        color: 'blue'
    },
    positioning: {
        alignment: 'right-center',
        left: '75',
        top: '15'
    }
}];

Spotlights.add(spotlights);

```

### Visit the page to see Spotlight in action

To see the Spotlight in action, visit the specified URL `/page/subpage` and look for the element with the class name `spot-me`.

The Spotlight will be triggered based on the defined configuration and will display the designated content, such as the title, body, and link. The design of the Spotlight can be customized using the provided icon and color options. The positioning of the Spotlight can also be adjusted using the alignment, left, and top properties. Explore the page to experience the Spotlight feature firsthand.

You may see a sample React app with the Spotlight feature in action [here](../../samples/react-sample/README.md).
