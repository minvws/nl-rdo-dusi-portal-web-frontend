# CasesTable Component

## Description

The `CasesTable` component displays a table of cases with pagination support.
It allows users to sort the table based on different columns and
navigate through pages.

## Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `data` | Array | - | An array of case objects to be displayed in the table. |
| `pagination` | PaginationMetaData | - | Pagination metadata for the table. |
| `sortingId` | String | - | The ID of the column used for sorting. |
| `sortingDirection` | 'ascending' \| 'descending' | - | The sorting direction of the table. |

## Slots

This component does not use any slots.

## Directives

This component does not use any directives.

## Events

| Name | Value | Description |
| ---- | ----- | ----------- |
| `sorting-change` | Object | Emitted when the sorting of the table changes. |
| `page-change` | Number | Emitted when the page of the table changes. |

## Usage

```html
<template>
  <CasesTable
    data="[]"
    pagination="{}"
    sorting-id="updated_at"
    sorting-direction="descending"
    @page-change="onPageChange"
    @sorting-change="onSortingChange"
  />
</template>
```
