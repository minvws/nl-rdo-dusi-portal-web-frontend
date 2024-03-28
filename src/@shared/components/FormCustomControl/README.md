# Form Control Component

## Description

This is a versatile form control component built for integration with JSONForms for schema-based form rendering.
It supports various types of form controls including text, number, file, radio, checkbox, and select.

## Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `control` | Object | - | The control element from JSON Forms. |
| `schema` | Object | - | The JSON schema for the form. |
| `uischema` | Object | - | The UI schema for the form. |

## Slots

| Name | Description |
| ---- | ----------- |
| `default` | The default slot is used for rendering the form control. |

## Directives

This component does not use any custom directives.

## Events

| Name | Value | Description |
| ---- | ----- | ----------- |
| `error` | Error | Emitted when there's an error in the form control. |
| `input` | InputEvent | Emitted when the user inputs data. |
| `change` | Event | Emitted when the form control's value changes. |
| `focus` | Event | Emitted when the form control is focused. |
| `blur` | Event | Emitted when the form control loses focus. |

## Usage

The component is not used in any templates directly.
It's used by the `CustomControlRenderer` to be rendered based on the control element from JSONForms.
