import type { JsonSchema } from "@jsonforms/core/src/models/jsonSchema"
import { InputType } from "@shared/types/input"

export const inputTypeValues: readonly string[] = Object.freeze(Object.values(InputType))
export const isInputType = (type: string): type is InputType => inputTypeValues.includes(type)

/**
 * This list is based on the field types that are defined in the portal shared package.
 * SubsidyStageDataSchemaBuilder::addFieldOptionsForType
 */
const schemaBasedInputTypes: InputType[] = [InputType.TEL, InputType.FILE]

export const getSchemaBasedInputType = (schema: JsonSchema): InputType | undefined => {
  return schemaBasedInputTypes.find((key: InputType) => key in schema)
}
