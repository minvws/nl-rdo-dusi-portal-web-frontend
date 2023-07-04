import type { Meta, StoryObj } from '@storybook/vue3'

import AppFooter from './AppFooter.vue'

const meta: Meta<typeof AppFooter> = {
  title: 'AppFooter',
  component: AppFooter
}

export default meta

type Story = StoryObj<typeof AppFooter>

export const Default: Story = {
  render: () => ({
    components: { AppFooter },
    template: `
      <body>
        <AppFooter />
      </body>
    `
  })
}
