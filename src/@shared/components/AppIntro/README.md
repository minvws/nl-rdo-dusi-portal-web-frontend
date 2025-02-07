# AppContent

## Description

`AppContent` is a reusable component that displays a content section with a title, an intro, and a body. The body content is rendered as HTML.

## Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `title` | String | - | The title of the content section. |
| `intro` | String | - | The introductory text of the content section. |
| `body` | String | - | The main body of the content section. This is rendered as HTML. |

## Slots

This component does not use any slots.

## Directives

This component does not use any directives.

## Events

This component does not emit any events.

## Usage

```html
<template>
  <AppContent
    title="My Title"
    intro="This is the introduction."
    body="<p>This is the main body content.</p>"
  />
</template>
```
