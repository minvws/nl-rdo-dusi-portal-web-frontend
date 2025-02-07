# FormFieldAddFileButton Component

## Description

The FormFieldAddFileButton component is used to trigger the addition of a file in a form.

## Props

This component does not accept any props.

## Slots

| Name | Description |
| ---- | ----------- |
| `default` | The default slot is used for rendering the button label. |

## Directives

This component does not use any custom directives.

## Events

| Name | Value | Description |
| ---- | ----- | ----------- |
| `add-file` | None | Emitted when the button is clicked. |

## Usage

```html
<template>
  <FormFieldAddFileButton
    @add-file="onAddFileInput"
  >
    Add file
  </FormFieldAddFileButton>
</template>
```
