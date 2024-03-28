# MessageCounter Component

## Description

The MessageCounter component is a simple Vue component used to display a message counter.

## Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `label` | String | - | ARIA label for the message counter. |
| `value` | Number | - | The value to be displayed as counter. |

## Slots

This component does not have any slots.

## Directives

This component does not use any directives.

## Events

This component does not emit any events.

## Usage

```html
<template>
  <MessageCounter
    label="messages"
    value="0"
  />
</template>
```
