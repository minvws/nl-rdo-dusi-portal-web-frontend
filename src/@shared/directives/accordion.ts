import type { Directive } from 'vue'

let init = false // prevent loading of multiple scripts

const vAccordion: Directive = {
  mounted() {
    if (init) return
    init = true
    // temporary fix for using accordion script in vue
    // remove when accordion script is updated
    const script = document.createElement('script') as HTMLScriptElement
    script.type = 'text/javascript'
    script.src = '/assets/js/accordion.min.js'
    script.async = true
    document.head.append(script)
  }
}

export default vAccordion
