# CaseReviewers Component

## Description

The `CaseReviewers` component displays information about the
reviewers assigned to a case. It provides functionality to
remove a reviewer from the case.

## Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `id` | String | - | The identifier of the case.|

## Slots

| Name | Description |
| ---- | ----------- |
| `fallback` | Content to be displayed when data fetching is in progress or encounters an error. |

## Directives

This component does not use any directives.

## Events

This component does not emit any events.

## Usage

```html
<template>
  <CaseReviewers
    id="123"
  />
</template>
```
