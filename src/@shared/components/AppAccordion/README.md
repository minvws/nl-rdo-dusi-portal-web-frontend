# AppAccordion Component

## Description

`AppAccordion` is a reusable accordion component for displaying collapsible content panels. It uses the `v-accordion` directive for handling accordion behavior.

## Props

This component does not have any props.

## Slots

| Name | Description |
| ---- | ----------- |
| `default` | Use this slot to pass in additional content |

## Directives

### `v-accordion`

This directive is used to provide the accordion functionality to the component. It is imported from `@shared/directives/accordion`.

## Events

This component does not emit any events.

## Usage

```html
<template>
  <AppAccordion>
    <AppAccordionItem id="1">Item 1</AppAccordionItem>
    <AppAccordionItem id="2">Item 2</AppAccordionItem>
    <AppAccordionItem id="3">Item 3</AppAccordionItem>
  </AppAccordion>
</template>
```
