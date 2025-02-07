# AppPagination

## Description

`AppPagination` is a reusable component that provides a pagination interface.
It allows users to navigate through different pages of content by clicking on
the page numbers or the previous/next buttons.

## Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `itemsTotal` | Number | - | Total number of items to be paginated. |
| `pageSize` | Number | - | Number of items per page. |
| `currentPage` | Number | - | Current active page. |
| `withButtons` | Boolean | false | Whether to show the previous and next buttons. |

## Slots

No slots are available for this component.

## Directives

This component does not use any directives.

## Events

| Name | Value | Description |
| ---- | ----- | ----------- |
| `page-change` | - | Emitted when the page changes. |

## Usage

```html
<template>
  <AppPagination
    items-total="100"
    page-size="10"
    current-page="1"
    with-buttons="true"
    @page-change="handlePageChange"
  />
</template>
```
