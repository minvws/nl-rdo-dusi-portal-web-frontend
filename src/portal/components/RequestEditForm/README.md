# RequestEditForm Component

## Description

The `RequestEditForm` component is used to load and display an editable form
for editing a specific request.

## Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `id` | String | - | The unique identifier of the request to edit |
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
  <RequestEditForm
    id="123"
    values="{}"
  />
</template>
```
