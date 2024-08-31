# Front-end Platform

## Productled Core

Productled code NPM library is a core library that is used in all the front-end features. It is a collection of reusable components, hooks, and utilities that are used across all the front-end feature code.

### Features

- Productled-core has the ability to listen to browser route changes and locate a DOM element based on a given CSS selector. This should be implemented in a generic way independent of the frontend framework used (such as React, Angular, Vue).

- Other feature-libraries are able to register hooks that are executed when the route changes. These hooks will receive the DOM element that was located by the core library. This allows for feature-libraries to be able to interact with the DOM element.
