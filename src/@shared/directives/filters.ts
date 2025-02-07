import type { Directive } from 'vue'
// @ts-expect-error - no declaration file for module
import { initFilterToggles } from '@minvws/manon/filters.js'

const vFilters: Directive = {
  mounted() {
    initFilterToggles()
  }
}

export default vFilters
