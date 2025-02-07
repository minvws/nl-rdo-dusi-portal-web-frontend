# FormViewRenderer Component

## Description

The FormViewRenderer component is a Vue component used to render a form view
with various functionalities such as form navigation,
data submission, and validation.

## Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `ariaLabel` | String | - | The ARIA label for the form. |
| `createDraft` | Boolean | - | Boolean flag indicating whether to create a draft of the form. |
| `forms` | Array | - | Array of form titles to be displayed in the form stepper. |
| `hideDebug` | Boolean | - | Boolean flag indicating whether to hide the debug view. |
| `locked` | Boolean | - | Boolean flag indicating whether the form is locked for editing. |
| `noButtons` | Boolean | - | Boolean flag indicating whether to hide form buttons. |
| `noStyle` | Boolean | - | Boolean flag indicating whether to apply styling to the form. |
| `persistent` | Boolean | - | Boolean flag indicating whether the form data persistence is enabled. |
| `readonly` | Boolean | - | Boolean flag indicating whether the form is in read-only mode. |
| `buttonLabels` | FormButtonLabels | - | Object containing labels for form buttons. |
| `hasSaveButton` | Boolean | - | Boolean flag indicating whether to display the save button. |

## Slots

This component does not use any slots.

## Directives

This component does not use any directives.

## Events

| Name | Value | Description |
| ---- | ----- | ----------- |
| `submit` | `formData` | Emitted when the form data is submitted. |
| `save` | `formData` | Emitted when the form data is saved. |
| `init` | `formData` | Emitted when the component is initialized. |

## Usage

The component is only used in the `FormView` component. The `FormView` component itself is used as follows:

```html
<template>
  <FormView
    hide-debug="true"
    hide-required-label="true"
    id="review-application-metadata"
    locked="true"
    no-buttons="true"
    no-style="true"
  />
</template>
```
