import type { TableDataTypes } from '@shared/types/table'
import { TableDataType } from '@shared/types/table'

const isButtonLink = ({ type }: { type: TableDataTypes }) => {
  switch (type) {
    case TableDataType.BUTTON_LINK:
    case TableDataType.BUTTON_GHOST_LINK:
      return true
    default:
      return false
  }
}

const isGhostButton = ({ type }: { type: TableDataTypes }) => {
  switch (type) {
    case TableDataType.BUTTON_GHOST_LINK:
      return true
    default:
      return false
  }
}

export const isExternalLink = ({ type }: { type: TableDataTypes }) => {
  switch (type) {
    case TableDataType.EXTERNAL_LINK:
      return true
    default:
      return false
  }
}

export const isLinkList = ({ type }: { type: TableDataTypes }) => {
  switch (type) {
    case TableDataType.LINK_LIST:
      return true
    default:
      return false
  }
}

export const isRouterLink = ({ type }: { type: TableDataTypes }) => {
  switch (type) {
    case TableDataType.LINK:
    case TableDataType.BUTTON_LINK:
    case TableDataType.BUTTON_GHOST_LINK:
      return true
    default:
      return false
  }
}

export const isAppButton = ({ type }: { type: TableDataTypes }) => {
  switch (type) {
    case TableDataType.BUTTON:
      return true
    default:
      return false
  }
}

export const isIcon = ({ type }: { type: TableDataTypes }) => {
  switch (type) {
    case TableDataType.ICON:
      return true
    default:
      return false
  }
}

export const getRouterLinkClasses = (item: { type: TableDataTypes }) => {
  return {
    button: isButtonLink(item),
    ghost: isGhostButton(item)
  }
}

export const hasItems = (data: Record<string, Record<string, unknown>>[], key: string) => {
  return data?.find(({ [key]: value }) => value && !!Object.keys(value).length)
}
