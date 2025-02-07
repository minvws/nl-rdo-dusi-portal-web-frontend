# Button Component

## Description

The Button Component is a reusable, customizable button. It can be used for form submissions or as a general clickable button.
The `text` prop and the default slot provide flexibility in what content is displayed within the button.

## Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `disabled` | Boolean | `false` | A boolean that determines whether the button is disabled or not. |
| `type` | String | `'button'` | A string that sets the button's type. It can be one of: `submit`, `reset`, or `button`. |
| `text` | String | - | A string that sets the button's text. |

## Slots

| Name | Description |
| ---- | ----------- |
| `default` | Use this slot to pass in additional content |

## Directives

This component does not use any directives.

## Events

This component does not emit any events.

## Usage

```html
<template>
  <AppButton>
    Click me!
  </AppButton>
</template>
```
