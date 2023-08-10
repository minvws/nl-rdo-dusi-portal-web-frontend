import type { Directive } from 'vue'
// @ts-ignore:next-line
import { initFilterToggles } from '@minvws/manon/filters.js'

const vFilters: Directive = {
  mounted() {
    initFilterToggles()
  }
}

export default vFilters
