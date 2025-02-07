# AppTable Component

## Description

This is a table component that can display data in a tabular format.
It supports sortable columns, external links, router links, buttons, icons, and link lists.
It also provides slots for customizing the table cells.

## Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `caption` | String | - | The caption of the table. |
| `columns` | Array | - | The columns of the table. |
| `data` | Array | - | The data to be displayed in the table. |
| `sortingId` | String | - | The id of the column that is currently sorted. |
| `sortingDirection` | String | 'ascending' | The direction of the current sorting. |

## Slots

This component does not use any slots.

## Directives

This component does not use any directives.

## Events

| Name | Value | Description |
| ---- | ----- | ----------- |
| `sorting-change` | - | Emitted when the sorting changes. |

## Usage

```html
<template>
  <AppTable
    caption="My Table"
    columns="[]"
    data="[]"
    sorting-id="id"
    sorting-direction="ascending"
    @sorting-change="onSortingChange"
  />
</template>
```
