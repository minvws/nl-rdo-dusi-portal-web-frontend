# FormFieldValidationResult Component

## Description

The FormFieldValidationResult component is a Vue component used for displaying validation results for a form field.
It iterates over a list of validation entries and displays messages with corresponding types.

## Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `validations` | Array | - | List of form validation entries. |
| `id` | String | - | Optional identifier for the component. |

## Slots

This component does not use any slots.

## Directives

This component does not use any directives.

## Events

| Name | Value | Description |
| ---- | ----- | ----------- |
| `suggestion` | Object | Emits when a suggestion button is clicked. |

## Usage

```html
<template>
  <FormFieldValidationResult
    validations="[]"
    id="id"
    @suggestion="handleSuggestion"
  />
</template>
```
