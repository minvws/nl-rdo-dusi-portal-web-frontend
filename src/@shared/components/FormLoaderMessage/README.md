# FormLoaderMessage Component

## Description

The FormLoaderMessage component is a Vue component used for displaying loading or
error messages during form loading or submission processes.

## Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `error` | String | - | Error message to be displayed. |
| `isFetching` | Boolean | - | Indicates whether the form is currently being fetched. |
| `isSubmitting` | Boolean | - | Indicates whether the form is currently being submitted.|

## Slots

This component does not use any slots.

## Directives

This component does not use any directives.

## Events

This component does not emit any events.

## Usage

```html
<template>
  <FormLoaderMessage
    error="error "
    is-fetching="true"
    is-submitting="false"
  />
</template>
```
