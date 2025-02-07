# FormTextControl Component

## Description

The FormTextControl component is a Vue component used to render text input or textarea control based on the specified input type.

## Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `id` | String | Required | The unique identifier for the control. |
| `type` | InputType | Required | The type of input control (e.g., 'text', 'textarea'). |
| `control` | Control | Required | The control configuration object. |
| `value` | String | undefined | The value of the input control. |
| `placeholder`| String | undefined | The placeholder text for the input control. |
| `disabled` | Boolean | false | A boolean indicating whether the input control is disabled or not. |
| `autofocus` | Boolean | false | A boolean indicating whether the input control should automatically get focus when the page loads. |

## Slots

This component does not have any slots.

## Directives

This component does not use any directives.

## Events

| Name | Value | Description |
| ---- | ----- | ----------- |
| `input` | Event | Emitted when the value of the input control changes. |
| `change` | void | Emitted when the value of the input control changes. |
| `focus` | Event | Emitted when the input control receives focus. |
| `blur` | Event | Emitted when the input control loses focus. |

## Usage

```html
<template>
  <FormTextControl
    id="username"
    type="text"
    control="{}"
    value="username"
    placeholder="Enter your username"
    disabled="false"
    autofocus="true"
    @input="onInput"
    @change="onChange"
    @focus="onFocus"
    @blur="onBlur"
  />
</template>
```
