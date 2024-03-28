# FormFieldDescription Component

## Description

This is a label component built with Vue 3 and TypeScript.
It's used to provide a description for a form field.

## Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `description` | String | - | The description text for the form field. |
| `labelFor` | String | - | The ID of the form field that the label is associated with. |

## Slots

This component does not have any slots.

## Directives

This component does not use any directives.

## Events

This component does not emit any events.

## Usage

```html
<template>
  <FormFieldDescription
    for="id"
    description="field description"
  />
</template>
```
