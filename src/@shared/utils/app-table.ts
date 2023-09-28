import { AssessmentsDataType, type AssessmentsDataTypes } from '@shared/types/table'

const isButtonLink = ({ type }: { type: AssessmentsDataTypes }) => {
  switch (type) {
    case AssessmentsDataType.BUTTON_LINK:
    case AssessmentsDataType.BUTTON_GHOST_LINK:
      return true
  }
  return false
}

const isGhostButton = ({ type }: { type: AssessmentsDataTypes }) => {
  switch (type) {
    case AssessmentsDataType.BUTTON_GHOST_LINK:
      return true
  }
  return false
}

export const isExternalLink = ({ type }: { type: AssessmentsDataTypes }) => {
  switch (type) {
    case AssessmentsDataType.EXTERNAL_LINK:
      return true
  }
  return false
}

export const isRouterLink = ({ type }: { type: AssessmentsDataTypes }) => {
  switch (type) {
    case AssessmentsDataType.LINK:
    case AssessmentsDataType.BUTTON_LINK:
    case AssessmentsDataType.BUTTON_GHOST_LINK:
      return true
  }
  return false
}

export const isAppButton = ({ type }: { type: AssessmentsDataTypes }) => {
  switch (type) {
    case AssessmentsDataType.BUTTON:
      return true
  }
  return false
}

export const isIcon = ({ type }: { type: AssessmentsDataTypes }) => {
  switch (type) {
    case AssessmentsDataType.ICON:
      return true
  }
  return false
}

export const getRouterLinkClasses = (item: { type: AssessmentsDataTypes }) => {
  return {
    button: isButtonLink(item),
    ghost: isGhostButton(item)
  }
}
