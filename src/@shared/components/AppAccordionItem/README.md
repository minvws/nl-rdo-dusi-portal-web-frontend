# AccordionItem Component

## Description

`AccordionItem` is a reusable component for displaying a single item in an accordion. It includes a button that can be clicked to expand or collapse the item, and a content area that displays the item's content.

## Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `id` | String | - | The unique identifier for the accordion item. This is used to generate the `id` and `aria-labelledby` attributes for accessibility. |
| `initiallyOpen` | Boolean | `false` | Determines whether the accordion item is open when it is first rendered. |
| `isHighlighted` | Boolean | `false` | Determines whether the accordion item is highlighted. When `true`, the item's button will have a different style. |

## Slots

| Name | Description |
| ---- | ----------- |
| `title` | Slot for inserting the title of the accordion item. |
| `content` | Slot for inserting the content of the accordion item. |

## Directives

This component does not use any directives.

## Events

This component does not emit any events.

## Usage

```html
<template>
  <AccordionItem
    id="item1"
    initially-open
    is-highlighted
  >
    <template #title>
      Item 1
    </template>
    <template #content>
      Content for item 1
    </template>
  </AccordionItem>
</template>
```
