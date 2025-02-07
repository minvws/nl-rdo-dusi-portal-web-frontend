import type { TableData } from '@shared/types/table'
import { TableDataType } from '@shared/types/table'

function isButtonLink({ type }: { type: TableData }): boolean {
  switch (type) {
    case TableDataType.BUTTON_LINK:
    case TableDataType.BUTTON_GHOST_LINK: {
      return true
    }
    default: {
      return false
    }
  }
}

function isGhostButton({ type }: { type: TableData }): boolean {
  switch (type) {
    case TableDataType.BUTTON_GHOST_LINK: {
      return true
    }
    default: {
      return false
    }
  }
}

export function isExternalLink({ type }: { type: TableData }): boolean {
  switch (type) {
    case TableDataType.EXTERNAL_LINK: {
      return true
    }
    default: {
      return false
    }
  }
}

export function isLinkList({ type }: { type: TableData }): boolean {
  switch (type) {
    case TableDataType.LINK_LIST: {
      return true
    }
    default: {
      return false
    }
  }
}

export function isRouterLink({ type }: { type: TableData }): boolean {
  switch (type) {
    case TableDataType.LINK:
    case TableDataType.BUTTON_LINK:
    case TableDataType.BUTTON_GHOST_LINK: {
      return true
    }
    default: {
      return false
    }
  }
}

export function isAppButton({ type }: { type: TableData }): boolean {
  switch (type) {
    case TableDataType.BUTTON: {
      return true
    }
    default: {
      return false
    }
  }
}

export function isIcon({ type }: { type: TableData }): boolean {
  switch (type) {
    case TableDataType.ICON: {
      return true
    }
    default: {
      return false
    }
  }
}

export function getRouterLinkClasses(item: { type: TableData }): Record<string, boolean> {
  return {
    button: isButtonLink(item),
    ghost: isGhostButton(item)
  }
}

export function hasItems(
  data: Record<string, Record<string, unknown>>[],
  key: string
): Record<string, Record<string, unknown>> | undefined {
  return data?.find(({ [key]: value }) => value && Object.keys(value).length > 0)
}
