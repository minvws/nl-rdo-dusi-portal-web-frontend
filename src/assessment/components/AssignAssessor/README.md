# AssignAssessor Component

## Description

The `AssignAssessor` component provides a user interface for assigning
assessors to a case. It includes an input field for searching
assessors, a list of matching assessors, and buttons for canceling
or submitting the assignment.

## Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `id` | String | - | The identifier of the case to which the assessors will be assigned. |

## Slots

This component does not have any slots.

## Directives

This component does not use any directives.

## Events

| Name | Value | Description |
| ---- | ----- | ----------- |
| `select` | void | Emitted when an assessor is selected. |
| `update:modelValue` | String | Emitted when the model value is updated. |

## Usage

```html
<template>
  <AssignAssessor
    id="123"
  />
</template>
```
