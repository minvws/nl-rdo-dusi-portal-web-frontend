# FormLoader Component

## Description

The FormLoader component is a Vue component used for loading and displaying forms.
It manages the fetching of form data and rendering of the forms.

## Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `id` | String | - | Identifier for the form loader. |
| `values` | Object | - | Initial values for the form data. |
| `edit` | Boolean | - | Indicates whether the form is in edit mode. |

## Slots

This component does not use any slots.

## Directives

This component does not use any directives.

## Events

This component does not emit any events.

## Usage

```html
<template>
  <FormLoader
    id="id"
    values="{}"
    edit="true"
  />
</template>
```
