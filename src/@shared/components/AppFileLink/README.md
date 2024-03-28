# AppFileLink Component

## Description

This component is designed to handle file links within an application.
It provides a link to a file, displays a loader while fetching the file,
and shows an error message if there's an error during the process.

## Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `field` | String | - | The field name associated with the file. |
| `file` | String | - | The file object containing the file details. |
| `formId` | String | - | The ID of the form where the file link is located. |

## Slots

This component does not use any slots.

## Directives

This component does not use any directives.

## Events

This component does not emit any events.

## Usage

```html
<template>
  <AppFileLink
    field="document"
    file="{ id: '1', name: 'File.pdf' }"
    form-id="form1"
  />
</template>
```
