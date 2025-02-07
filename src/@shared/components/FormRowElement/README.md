# FormRowElement Component

## Description

The FormRowElement component is a Vue component used for
rendering a field within a form row.

## Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `hasLeft` | Boolean | false | Indicates whether the left slot is present. |
| `contentClass` | String | - | CSS class to be applied to the content of the field. |
| `isGroup` | Boolean | false | Indicates whether the field is part of a group. |

## Slots

| Name | Description |
| ---- | ----------- |
| `left` | Slot for placing content on the left side of the field. |
| `right` | Slot for placing content on the right side of the field. |
| `description` | Slot for placing a description of the field. |

## Directives

This component does not use any directives.

## Events

This component does not emit any events.

## Usage

```html
<template>
  <FormRowElement
    has-left="true"
    content-class="class"
    is-group="false"
  >
  <!-- Place content for left, right, and description slots here -->
  </FormRowElement>
</template>
```
