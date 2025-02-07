# HtmlComponent

## Description

`HtmlComponent` is a reusable component that renders HTML content.
It can be used to display dynamic HTML content.
The component also handles click events on anchor tags and navigates using the Vue router for local links.

## Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `as` | String | 'div' | The HTML tag to be used for the component. |
| `html` | String | - | The HTML content to be rendered. |

## Slots

This component does not use any slots.

## Directives

This component does not use any directives.

## Events

This component does not emit any events.

## Usage

```html
<template>
  <HtmlComponent
    as="section"
    html="<p>Some HTML content</p>"
  />
</template>
```
