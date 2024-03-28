# FormNotification Component

## Description

The FormNotification component is a Vue component used for displaying notifications within a form.
It provides options for dismissable notifications and accessibility features.

## Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `message` | String/Object | - | Message to be displayed in the notification. |
| `displayAs` | String | - | Display style for the notification. |
| `dismissable` | Boolean | - | Indicates whether the notification is dismissable. |
| `label` | String | - | Label for the notification. |
| `id` | String | - | Identifier for the notification. |
| `announce` | Boolean | - | Indicates whether the notification should be announced to screen readers. |
| `htmlId` | String | - | HTML id attribute for the notification element. |

## Slots

This component does not use any slots.

## Directives

This component does not use any directives.

## Events

This component does not emit any events.

## Usage

```html
<template>
  <FormNotification
    display-as="info"
    label="label"
    message="message"
    id="id"
    announce="true"
    dismissable="true"
  />
</template>
```
