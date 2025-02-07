# FormNumberControl Component

## Description

The FormNumberControl component is a Vue component used for inputting numerical values in a form.
It provides features for handling integer and decimal numbers.

## Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `id` | String | - | Identifier for the number control. |
| `type` | InputType | - | Type of input control (INTEGER or NUMBER). |
| `control` | Control | - | Control object defining the behavior of the input. |
| `value` | Number | - | Current value of the input. |
| `placeholder` | String | - | Placeholder text for the input. |
| `disabled` | Boolean | - | Determines whether the input is disabled. |
| `autofocus` | Boolean | - | Determines whether the input should be focused automatically. |

## Slots

This component does not use any slots.

## Directives

This component does not use any directives.

## Events

| Name | Value | Description |
| ---- | ----- | ----------- |
| `input` | Event | Emitted when the input value changes. |
| `change` | void | Emitted when the input value changes and the input loses focus. |
| `focus` | Event | Emitted when the input gains focus. |
| `blur` | Event | Emitted when the input loses focus. |

## Usage

```html
<template>
  <FormNumberControl
    id="number-input"
    type="number"
    control="{}"
    value="value"
    placeholder="Enter a number"
    disabled="false"
    autofocus="true"
    autocomplete="off"
    min="1"
    max="1000"
    minlength="3"
    maxlength="6"
    @input="handleInput"
    @change="handleChange"
    @focus="handleFocus"
    @blur="handleBlur"
  />
</template>
```
