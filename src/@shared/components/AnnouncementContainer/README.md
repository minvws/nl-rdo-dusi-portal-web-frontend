# Announcement Component

## Description

The Announcement Component is designed to improve accessibility by providing a way to announce dynamic updates to assistive technologies.
The component is visually hidden but can be read by screen readers. It uses ARIA properties to manage how updates are announced. The `aria-atomic="true"` property indicates that the entire region should be considered as a whole when announcing updates. The `:aria-live` property, bound to the `politeness` value, controls the politeness level of the announcement.
The component uses a store to manage its state, specifically the `message` to be announced and the `politeness` level. The `storeToRefs` function from `pinia` is used to extract these values from the store.

## Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `message` | String | - | The message to be announced by assistive technologies. |
| `politeness` | String | 'polite' | The politeness level for the announcement. Can be 'off', 'polite', or 'assertive'. |

## Slots

This component does not use any slots.

## Directives

This component does not use any directives.

## Events

This component does not emit any events.

## Usage

```html
<template>
  <Announcement
    message="message"
    politeness="'polite'"
  />
</template>
```
