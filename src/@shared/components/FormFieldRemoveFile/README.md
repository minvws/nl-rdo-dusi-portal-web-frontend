# FormFieldRemoveFile Component

## Description

The FormFieldRemoveFile component is a Vue component used for managing the removal of files associated with a form field.
It provides functionality to display the file label and remove the file. If the file is pending (being uploaded), it displays a loader.

## Props

| Name        | Type                  | Default   | Description                                      |
|-------------|-----------------------|-----------|--------------------------------------------------|
| `disabled`  | Boolean               | -         | Determines whether the component is disabled.    |
| `file`      | FileType \| undefined | undefined | File associated with the form field.             |
| `index`     | Number                | -         | Index of the file.                               |
| `isPending` | Boolean               | -         | Indicates whether the file is pending (loading). |
| `labelFor`  | String                | -         | ID of the associated label.                      |

## Slots

This component does not have any slots.

## Directives

This component does not use any directives.

## Events

| Name          | Value | Description                              |
|---------------|-------|------------------------------------------|
| `removedFile` | None  | Emits when the remove button is clicked. |

## Usage

```html
<template>
  <FormFieldRemoveFile
    disabled="true"
    file="{ name: 'file.txt', mimeType: 'text/plain', size: 1024 }"
    index="0"
    is-pending="false"
    label-for="file-label"
    @removed-file="onRemovedFile"
  />
</template>
```
