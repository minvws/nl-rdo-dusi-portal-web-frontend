# FormFieldRemoveFile Component

## Description

The FormFieldRemoveFile component is a Vue component used for managing the removal of files associated with a form field.
It provides functionality to display the file label and remove the file. If the file is pending (being uploaded), it displays a loader.

## Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `handleChange` | Function | - | Callback function triggered on file removal. |
| `id` | String | - | Identifier for the form field. |
| `index` | Number | - | Index of the file. |
| `labelFor` | String | - | ID of the associated label. |
| `error` | String | - | Error message related to the file. |
| `disabled` | Boolean | - | Determines whether the component is disabled. |
| `files` | Array | - | Array of files associated with the form field. |
| `isPending` | Boolean | - | Indicates whether the file is pending (loading). |

## Slots

This component does not have any slots.

## Directives

This component does not use any directives.

## Events

| Name | Value | Description |
| ---- | ----- | ----------- |
| `blur` | None | Emits when the component loses focus. |

## Usage

```html
<template>
  <FormFieldRemoveFile
    id="file-input"
    index="0"
    label-for="file-label"
    error="fileError"
    disabled="true"
    files="[]"
    is-pending="false"
    @blur="handleBlur"
  />
</template>
```
