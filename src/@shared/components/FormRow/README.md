# FormRow Component

## Description

The FormRow component is a Vue component used for rendering a row in a form layout.

## Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `contentClass` | String | - | CSS class to be applied to the content of the row. |
| `hideRequiredLabel` | Boolean | false | Indicates whether the required label should be hidden. |
| `isGroup` | Boolean | false | Indicates whether the row represents a group of fields. |
| `validationResult` | Array | - | Array of validation results for the row. |
| `handleChange` | Function | - | Function to handle change events. |
| `onRemoteValidation` | Function | - | Function to trigger remote validation. |
| `id` | String | - | Unique identifier for the row. |
| `errors` | Array | - | Array of error messages for the row. |
| `appliedOptions` | Options | - | Applied options for the row. |

## Slots

| Name | Description |
| ---- | ----------- |
| `default` | Use this slot to pass in additional content |

## Directives

This component does not use any directives.

## Events

This component does not emit any events.

## Usage

```html
<template>
  <FormRow
    id="row1"
    content-class="content-class"
    hide-required-label="true"
    is-group="false"
    validation-result="[]"
    handle-change="handleChange"
    on-remote-validation="onRemoteValidation"
  >
    <!-- Additional content goes here -->
  </FormRow>
</template>
```
