# NavLink Component

## Description

The `NavLink` component is a custom wrapper around `RouterLink` from Vue Router.
It provides enhanced functionality for navigation links in Vue applications.

## Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `to` | String \| RouteLocationRaw \| RouteLocation | - | The target route of the navigation link. |
| `replace` | Boolean | `false` | When set to `true`, the navigation will replace the current entry in the history stack. |
| `activeClass` | String | `'router-link-active'` | The class applied to the link when it is active. |
| `exactActiveClass` | String | `'router-link-exact-active'` | The class applied to the link when it is exactly active. |
| `exact` | Boolean | `false` | Whether to only match exact target location. |

## Slots

| Name | Description |
| ---- | ----------- |
| `default` | Content to be rendered inside the navigation link. |

## Directives

This component does not use any directives.

## Events

This component does not emit any events.

## Usage

```html
<template>
  <NavLink to="/about">
    About Us
  </NavLink>
</template>
```
