import { translate } from '@shared/i18n'
import type { JsonFormsI18nState } from '@jsonforms/core'

const getProps = (context: any) => {
  // pass field of field to i18n
  const property = context?.error?.params?.missingProperty
  const title =
    context?.uischema?.label ?? context?.error?.parentSchema?.properties?.[property]?.title
  const field = title ?? translate(`form.fields.${property}.label`) ?? property
  const isBoolean = context?.error?.parentSchema?.properties?.[property]?.type === 'boolean'
  return { field, isBoolean }
}
export const useI18n = () => {
  return {
    translate: (id: string, defaultMessage?: string, context?: any): string | undefined => {
      const { isBoolean, ...props } = getProps(context)
      const type = isBoolean ? '-boolean' : ''
      return translate(`form.fields.${id}${type}`, props) ?? defaultMessage
    }
  } as JsonFormsI18nState
}
