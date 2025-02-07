# FormButtons Component

## Description

This is a form buttons component that displays a set of buttons for form navigation and submission.
It supports internationalization for the button labels.

## Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `forms` | Array | - | The forms to be navigated. |
| `formsErrors` | FormErrors | - | The errors of the forms. |
| `index` | Number | - | The current index of the form. |
| `readonly` | Boolean | false | Whether the form is readonly. |
| `touched` | Array | [] | The indices of the touched forms. |
| `buttonLabels` | FormButtonLabels | - | The labels of the buttons. |
| `hasSaveButton` | Boolean | false | Whether to display the save button. |

## Slots

This component does not use any slots.

## Directives

This component does not use any directives.

## Events

| Name | Value | Description |
| ---- | ----- | ----------- |
| `validate` | void | Emitted when the form needs to be validated. |
| `step` | Number | Emitted when the form needs to navigate to a step. |
| `save` | Number | Emitted when the form needs to be saved. |
| `submit` | void | Emitted when the form needs to be submitted. |

## Usage

```html
<template>
  <FormButtons
    forms="[]"
    forms-errors="[]"
    index="0"
    readonly="true"
    touched="[]"
    button-labels="{}"
    has-save-button="true"
    @validate="onValidate"
    @step="onStep"
    @save="onSave"
    @submit="onSubmit"
  />
</template>
```
