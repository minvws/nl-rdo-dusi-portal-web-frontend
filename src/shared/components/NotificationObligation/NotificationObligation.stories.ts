import type { Meta, StoryObj } from '@storybook/vue3'

import NotificationObligation from './NotificationObligation.vue'

const meta: Meta<typeof NotificationObligation> = {
  title: 'NotificationObligation',
  component: NotificationObligation
}

export default meta

type Story = StoryObj<typeof NotificationObligation>

export const Default: Story = {
  render: () => ({
    components: { NotificationObligation },
    template: `
      <main>
        <NotificationObligation />
      </main>
    `
  })
}
