# CaseHistoryTable Component

## Description

The `CaseHistoryTable` component displays the history of a case in a tabular format. It provides sorting functionality for certain columns such as 'updated_at' and 'assessor'.

## Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `data` | Array | - | An array of data representing the case history. |

## Slots

This component does not have any slots.

## Directives

This component does not use any built-in Vue directives.

## Events

| Name | Value | Description |
| ---- | ----- | ----------- |
| `sorting-change` | String | Emits the new sort order when the sorting of the table changes. |

## Usage

```html
<template>
  <CaseHistoryTable
    data="[]"
  />
</template>
```
