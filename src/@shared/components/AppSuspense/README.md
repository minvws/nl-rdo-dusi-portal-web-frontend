# AppSuspense

## Description

This is a AppSuspense component that can change its behavior based on the provided props.
It can display a loader, an error message, or the actual content based on the fetching status and the presence of data or an error.
It also provides slots for customizing the title and the fallback content.

## Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `as` | String | 'div' | The tag name of the component to render. |
| `data` | Array or Object or Undefined | - | The data to be displayed when it's available and fetching is completed. |
| `error` | Error or String or Undefined | - | The error to be displayed when there's an error. |
| `isFetching` | Boolean | - | Indicates whether the data is being fetched. |
| `loaderIsCentered` | Boolean | true | Indicates whether the loader should be centered. |
| `showLoader` | Boolean | true | Indicates whether the loader should be displayed while fetching the data. |

## Slots

| Name | Description |
| ---- | ----------- |
| `title` | Slot for providing a custom title. |
| `default` | Slot for providing the main content to be displayed when data is available. |
| `fallback` | Slot for providing fallback content when there's no data or an error. |

## Directives

This component does not use any directives.

## Events

This component does not emit any events.

## Usage

```html
<template>
  <AppSuspense
    as="section"
    data="[]"
    error="error"
    is-fetching="true"
    loader-is-centered="true"
    show-loader="true"
  >
    <template #title>
      <h1>My Title</h1>
    </template>
    <template #fallback>
      <p>No data available.</p>
    </template>
  </AppSuspense>
</template>
```
