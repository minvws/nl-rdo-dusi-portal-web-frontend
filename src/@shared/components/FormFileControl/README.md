# FormFileControl Component

## Description

The FormFileControl component is a Vue component used for managing file inputs in a form.
It allows users to add and remove files, displaying associated controls such as file input,
remove file button, and add file button.

## Props

| Name           | Type                      | Default | Description                                                   |
|----------------|---------------------------|---------|---------------------------------------------------------------|
| `accept`       | String                    | -       | Specifies the types of files that the input accepts.          |
| `maxFileSize`  | Number                    | -       | Maximum file size allowed for upload (in bytes).              |
| `autofocus`    | Boolean                   | -       | Determines whether the input should be focused automatically. |
| `control`      | Control                   | -       | Control object defining the behavior of the input.            |
| `disabled`     | Boolean                   | -       | Determines whether the input is disabled.                     |
| `handleChange` | Function                  | -       | Function to update a value of an input.                       |
| `resetError`   | Function                  | -       | Function to resetError of the input.                          |
| `id`           | String                    | -       | Identifier for the component.                                 |
| `placeholder`  | String                    | -       | Placeholder text for the input.                               |
| `type`         | InputType                 | -       | Type of input control.                                        |
| `value`        | (FileType \| undefined)[] | -       | Current value of the input.                                   |
| `error`        | String                    | -       | Error message related to the input.                           |

## Slots

This component does not use any slots.

## Directives

This component does not use any directives.

## Events

| Name | Value | Description |
| ---- | ----- | ----------- |
| `input` | Object | Emits when the input value changes. |
| `change` | Object | Emits when the input value changes. |
| `focus` | Object | Emits when the input gains focus. |
| `blur` | Object | Emits when the input loses focus. |
| `error` | String | Emits when an error occurs during input handling.|

## Usage

```html
<template>
  <FormFileControl
    accept="image/*"
    max-file-size="1000"
    autofocus="true"
    control="{}"
    disabled="false"
    handle-change="handleChange"
    id="id"
    placeholder="placeholder"
    type="file"
    value="value"
    error="error"
    @change="handleInputChange"
    @blur="handleInputBlur"
  />
</template>
```
