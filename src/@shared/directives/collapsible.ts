import type { Directive } from 'vue'
// @ts-expect-error - no declaration file for module
import { initNavigation } from '@minvws/manon/collapsible.js'

const vCollapsible: Directive = {
  mounted() {
    initNavigation()
  }
}

export default vCollapsible
