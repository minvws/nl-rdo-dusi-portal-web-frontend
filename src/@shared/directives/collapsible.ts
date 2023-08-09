import type { Directive } from 'vue'
// @ts-ignore:next-line
import { initNavigation } from '@minvws/manon/collapsible.js'

const vCollapsible: Directive = {
  mounted() {
    initNavigation()
  }
}

export default vCollapsible
