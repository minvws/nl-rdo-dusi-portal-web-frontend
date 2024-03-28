# AppIcon

## Description

`AppIcon` is a reusable component that displays an icon. The icon is specified by the `name` prop. The component also supports accessibility features with the `ariaHidden` prop.

## Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `name` | String | - | The name of the icon to be displayed. |
| `ariaHidden` | Boolean | false | Whether the icon should be hidden from screen readers. |

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
  <AppIcon
    name="user"
    aria-hidden="true"
  />
</template>
```
