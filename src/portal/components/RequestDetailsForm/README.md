# RequestDetailsForm Component

## Description

The `RequestDetailsForm` component displays a form view for a
specific request based on the provided reference.

## Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `id` | String | - | The unique identifier of the request |
| `reference` | String | - | The reference of the request used to fetch the form |
| `values` | Object | - | The pre-filled values for the form fields |

## Slots

This component does not have any slots.

## Directives

This component does not use any directives.

## Events

This component does not emit any events.

## Usage

```html
<template>
  <RequestDetailsForm
    id="123"
    reference="ABC"
    values="{}"
  />
</template>
```
