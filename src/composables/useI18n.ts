import { translate } from '@/i18n'
import type { JsonFormsI18nState } from '@jsonforms/core'

const getProps = (context: any) => {
  // pass field of field to i18n
  const property = context?.error?.params?.missingProperty
  const title = context?.error?.parentSchema?.properties?.[property]?.title
  const field = title ?? translate(`form.fields.${property}.label`) ?? property
  return { field }
}
export const useI18n = () => {
  return {
    translate: (id: string, defaultMessage?: string, context?: any): string | undefined => {
      return translate(`form.fields.${id}`, getProps(context)) ?? defaultMessage
    }
  } as JsonFormsI18nState
}
