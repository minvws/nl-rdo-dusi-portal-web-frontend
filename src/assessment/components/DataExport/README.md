# DataExport Component

## Description

The `DataExport` component provides a form for exporting
data within a specified date range (if needed for export). It allows users to select a start date
and an end date for exporting data and triggers the download of
the exported data in CSV format.

## Props


| Name             | Type      | Default | Description                                                                       |
|------------------|-----------|---------|-----------------------------------------------------------------------------------|
| `title`          | `string`  | -       | The title of the export form.                                                     |
| `intro`          | `string`  | -       | The description of what will be exported.                                         |
| `hasDateFilters` | `boolean` | -       | If the export supports start and end date filters.                                |
| `endpointUrl`    | `string`  | -       | The url of the export endpoint, for example `${baseUrl}/api/export/applications`. |

## Slots

This component does not use any slots.

## Directives

This component does not use any directives.

## Events

This component does not emit any events.

## Usage

```html
<template>
  <DataExport
    title="Subsidy report"
    intro="Export of all the requests in CSV format."
    :hasDateFilters="true"
    endpointUrl="https://example.com/api/export/applications" />
</template>
```
