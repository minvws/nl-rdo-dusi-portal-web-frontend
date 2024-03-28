# FilterOptions Component

## Description

This is a filter options component that displays a form for filter options.
It supports internationalization for the form title and submit button.
It also provides a slot for customizing the filter options.

## Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `type` | String | - | The type of the form options. |
| `autoClose` | Boolean | false | Whether to automatically close the filter options after submission. |
| `disabled` | Boolean | false | Whether the filter options are disabled. |
| `modelValue` | Object | - | The current value of the form. |

## Slots

This component does not use any slots.

## Directives

This component does not use any directives.

## Events

| Name | Value | Description |
| ---- | ----- | ----------- |
| `update:modelValue` | FormData | Emitted when the form data changes. |
| `close` | void | Emitted when the filter options are closed. |

## Usage

```html
<template>
  <FilterOptions
    type="type"
    auto-close="true"
    disabled="false"
    model-value="{}"
    @update:model-value="onFormDataChange"
    @close="onClose"
  />
</template>
```
