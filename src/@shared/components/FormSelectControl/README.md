# FormSelectControl Component

## Description

The FormSelectControl component is a Vue component used to
render a select input control within a form.

## Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `id` | String | Required | The id of the select input control. |
| `options` | Array | Required | An array of objects representing the options for the select control. |
| `type` | Enum | Required | The type of input control. |
| `value` | String | undefined | The current value of the select input control. |
| `autofocus` | Boolean | undefined | A boolean indicating whether the select input control should receive focus automatically. |
| `disabled` | Boolean | undefined | A boolean indicating whether the select input control should be disabled. |
| `placeholder`| String | undefined | The placeholder text for the select input control. |

## Slots

This component does not have any slots.

## Directives

This component does not use any directives.

## Events

| Name | Value | Description |
| ---- | ----- | ----------- |
| `input` | Event | Emitted when the value of the select input control changes. |
| `change` | void | Emitted when the value of the select input control changes. |
| `focus` | Event | Emitted when the select input control receives focus. |
| `blur` | Event | Emitted when the select input control loses focus. |

## Usage

```html
<template>
  <FormSelectControl
    id="select"
    :options="[]"
    type="select"
    v-model="selectedOption"
    placeholder="Select an option"
  />
</template>
```
