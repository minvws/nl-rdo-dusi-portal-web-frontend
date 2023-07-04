import type { Directive, DirectiveBinding } from 'vue'
// @ts-ignore:next-line
import { initNavigation } from '@minvws/manon/collapsible.js'

const vCollapsible: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    initNavigation()
  }
}

export default vCollapsible
