import type { Directive, DirectiveBinding } from 'vue'
// @ts-ignore:next-line
import { initFilterToggles } from '@minvws/manon/filters.js'

const vFilters: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    initFilterToggles()
  }
}

export default vFilters
