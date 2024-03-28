# FormFieldError Component

## Description

The FormFieldError component is a simple Vue component used for displaying a list of errors.
It takes a string of errors as a prop and splits them by newline characters to display each error separately.

## Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `errors` | String | - | The string containing errors. |
| `id` | String | - | Optional ID for the component. |

## Slots

This component does not have any slots.

## Directives

This component does not use any directives.

## Events

This component does not emit any events.

## Usage

```html
<template>
  <FormFieldError
    errors="errors"
    id="id"
  />
</template>
```
