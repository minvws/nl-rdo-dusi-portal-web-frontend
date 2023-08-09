import type { Meta, StoryObj } from '@storybook/vue3'

import AppAccordion from './AppAccordion.vue'
import AppAccordionItem from '@shared/components/AppAccordionItem/AppAccordionItem.vue'

const meta: Meta<typeof AppAccordion> = {
  title: 'AppAccordion',
  component: AppAccordion
}

export default meta

type Story = StoryObj<typeof AppAccordion>

export const Default: Story = {
  render: () => ({
    components: { AppAccordion, AppAccordionItem },
    template: `
      <AppAccordion>
        <AppAccordionItem id="foo">
          <template #title>Pellentesque pretium placerat metus nec sodales</template>
          <template #content>
            <p>Vivamus blandit ac justo nec iaculis. Proin tempor dolor accumsan placerat tincidunt. Sed in arcu a nunc dignissim porttitor. Duis sodales mattis placerat.</p>
          </template>
        </AppAccordionItem>
        <AppAccordionItem id="bar">
          <template #title>Sed dignissim libero nec blandit placerat</template>
          <template #content>
            <p>Maecenas venenatis, orci iaculis congue facilisis, mi justo fringilla tortor, in aliquet enim mi eu nisi. Nulla efficitur risus lorem, at rutrum dui efficitur eu. Nulla condimentum neque in semper feugiat. Nullam pellentesque fermentum mauris at tempor.</p>
          </template>
        </AppAccordionItem>
      </AppAccordion>
    `
  })
}
