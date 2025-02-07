# FormStepper Component

## Description

The FormStepper component is a Vue component used to render a stepper navigation for forms.

## Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `forms` | Array | Required | An array of objects representing the titles of the forms. |
| `formsErrors` | FormErrors | Required | An object containing errors for each form. |
| `index` | Number | Required | The index of the currently active form. |
| `readonly` | Boolean | false | A boolean indicating whether the stepper should be readonly or not. |
| `touched` | Array | undefined | An array of numbers representing the indices of forms that have been interacted with. |
| `validationResult` | FormValidationResult | undefined | An object containing validation results for each form. |

## Slots

This component does not have any slots.

## Directives

This component does not use any directives.

## Events

| Name | Value | Description |
| ---- | ----- | ----------- |
| `step` | Number | Emitted when a step button is clicked. The value emitted is the index of the clicked form. |

## Usage

```html
<template>
  <FormStepper
    forms="[]"
    formsErrors="{}"
    index="0"
    readonly="true"
    touched="[]"
    @step="onStepChange"
  />
</template>
```
