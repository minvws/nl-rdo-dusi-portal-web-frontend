# CaseStatus Component

## Description

The `CaseStatus` component displays the status of a case with
a corresponding tag. It provides a visual indication of
the current status of the case.

## Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `type` | 'new' \| 'inProgress' \| 'approved' \| 'rejected' | - | The status type of the case. |

## Slots

This component does not use any slots.

## Directives

This component does not use any directives.

## Events

This component does not emit any events.

## Usage

```html
<template>
  <CaseStatus
    type="new"
  />
</template>
```
