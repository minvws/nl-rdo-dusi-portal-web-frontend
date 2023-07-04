import type { Directive, DirectiveBinding } from 'vue'

const vAccordion: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    // temporary fix for using accordion script in vue
    // remove when accordion script is updated
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = '/assets/js/accordion.min.js'
    script.async = true
    document.head.appendChild(script)
  }
}

export default vAccordion
