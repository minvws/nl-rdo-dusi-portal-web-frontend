# AppPaginationItem

## Description

`AppPaginationItem` is a reusable component that represents a single page item in a pagination interface. It can be a number or an ellipsis.

## Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `currentPage` | Number | - | Current active page. |
| `label` | Number or String | - | Label to be displayed on the page item. |
| `pageIndex` | Number | - | Index of the page item. |
| `showSeparator` | Boolean | false | Whether to show a separator before the page item. |
| `ellipsisPosition` | String | - | Position of the ellipsis. Can be 'start' or 'end'. |

## Slots

No slots are available for this component.

## Directives

This component does not use any directives.

## Events

| Name | Value | Description |
| ---- | ----- | ----------- |
| `page-change` | - | Emitted when the page item is clicked. The payload is the index of the page. |

## Usage

```html
<template>
  <AppPaginationItem
    current-page="1"
    label="1"
    page-index="1"
    show-separator="false"
    ellipsis-position="start"
    @page-change="handlePageChange"
  />
</template>
```
