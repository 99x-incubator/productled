---
title: Dynamic Routes
layout: home
nav_order: 5
---

# Dynamic Routes

Dynamic routes allow you to match flexible URL patterns using wildcards and parameters, making it easier to configure routes without hardcoding specific paths. This is especially useful for applying plugins or hooks across multiple pages in your application.

## Configuring Dynamic Routes

You can define dynamic routes using the following patterns:

* **Parameters (`:param`)**: Captures dynamic segments of the URL.
  * Example: `/products/:product-id/reviews` matches URLs like `/products/123/reviews`.
* **Wildcards (`*`)**: Matches any sequence of characters.
  * Example: `/products/*` matches any path under `/products/`, like `/products/123`.

## Example Configuration

Here’s an example configuration using dynamic routes to trigger a Spotlight and a Tooltip:

```json
{
    "hooks": [
        {
            "plugin": "spotlight",
            "trigger": {
                "url": "/products/:product-id/reviews",
                "selector": ".add-review-button",
                "frequency": "always"
            },
            "config": {
                "title": "Product Reviews",
                "description": "Leave a review for this product.",
                "link": "https://example.com/product-info"
            }
        },
        {
            "plugin": "tooltip",
            "trigger": {
                "url": "/products/*",
                "selector": ".product-info",
                "frequency": "always"
            },
            "config": {
                "title": "Product Information",
                "description": "Learn more about this product.",
                "link": "https://example.com/product-info"
            }
        }
    ]
}
```

### Configuration Breakdown

- `/products/:product-id/reviews` matches specific product review pages, such as `/products/123/reviews`.
- `/products/*` matches any URL under the `/products/` path, including `/products/123`, `/products/123/reviews`, and `/products/tags/101`.

### Tooltip and Spotlight Behavior

- **Tooltip**: The tooltip will be displayed on any page under `/products/` (e.g., `/products/123`, `/products/tags/101`), whenever the `.product-info` selector is present.
- **Spotlight**: The spotlight will be displayed specifically on product review pages like `/products/123/reviews`, when the `.add-review-button` selector is present.