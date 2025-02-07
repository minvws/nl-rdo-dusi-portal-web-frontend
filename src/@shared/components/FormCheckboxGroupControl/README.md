# FormCheckboxGroup Component

## Description

This is a form checkbox group component that displays a group of checkboxes.
Each checkbox corresponds to an item in the provided list.

## Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `autofocus` | Boolean | false | Whether to automatically focus the checkbox group. |
| `disabled` | Boolean | false | Whether the checkbox group is disabled. |
| `id` | String | - | The id of the checkbox group. |
| `value` | Array | [] | The current values of the checkbox group. |
| `control` | Control | - | The control of the checkbox group. |
| `handleChange` | function | - | The function to handle changes in the checkbox group. |

## Slots

This component does not use any slots.

## Directives

This component does not use any directives.

## Events

| Name | Value | Description |
| ---- | ----- | ----------- |
| `change` | void | Emitted when the value of the checkbox group changes. |
| `focus` | Event | Emitted when the checkbox group is focused. |
| `blur` | Event | Emitted when the checkbox group is blurred. |

## Usage

```html
<template>
  <FormCheckboxGroup
    autofocus="true"
    disabled="false"
    id="id"
    value="[]"
    control="{}"
    handle-change="myHandleChange"
    @change="onChange"
    @focus="onFocus"
    @blur="onBlur"
  />
</template>
```
