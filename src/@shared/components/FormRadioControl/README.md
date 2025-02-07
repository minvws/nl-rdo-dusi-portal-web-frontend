# FormRadioControl Component

## Description

The FormRadioControl component is a Vue component used for displaying a group of radio buttons within a form.
It provides options for selecting one option from a set of choices.

## Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `id` | String | - | Identifier for the radio button group. |
| `type` | InputType | - | Type of input control (e.g., "radio"). |
| `control` | Control | - | Control object defining the behavior of the input.|
| `value` | String | - | Current selected value of the radio button group. |
| `disabled` | Boolean | - | Determines whether the radio buttons are disabled.|

## Slots

This component does not use any slots.

## Directives

This component does not use any directives.

## Events

| Name | Value | Description |
| ---- | ----- | ----------- |
| `input` | Event | Emitted when the radio button value changes. |
| `change` | void | Emitted when the radio button value changes. |
| `focus` | Event | Emitted when the radio button gains focus. |
| `blur` | Event | Emitted when the radio button loses focus. |

## Usage

```html
<template>
  <FormRadioControl
    id="id"
    type="radio"
    control="{}"
    value="value"
    disabled="false"
    @input="handleInput"
    @change="handleChange"
    @focus="handleFocus"
    @blur="handleBlur"
  />
</template>
```
