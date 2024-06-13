# RequestSteps Component

## Description

The `RequestSteps` component displays the steps involved in processing
a request, organized in an accordion format with each step
containing relevant information.

## Props

| Name                  | Type   | Default | Description                                      |
|-----------------------|--------|---------|--------------------------------------------------|
| `reference`           | String | -       | The reference code of the request                |
| `finalReviewDeadline` | String | -       | The review deadline of the request               |
| `submittedAt`         | String | -       | The date and time when the request was submitted |

## Slots

This component does not have any slots.

## Directives

This component does not use any directives.

## Events

This component does not emit any events.

## Usage

```html
<template>
  <RequestSteps
    reference="123456"
    final-review-deadline="2021-12-31T23:59:59Z"
    submitted-at="2021-12-31T23:59:59Z"
  />
</template>
```
