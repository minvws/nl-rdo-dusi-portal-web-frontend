import type { Meta, StoryObj } from '@storybook/vue3'

import MoreInfo from './MoreInfo.vue'

const meta: Meta<typeof MoreInfo> = {
  title: 'MoreInfo',
  component: MoreInfo
}

export default meta

type Story = StoryObj<typeof MoreInfo>

export const Default: Story = {
  render: () => ({
    components: { MoreInfo },
    template: `
      <main>
        <MoreInfo />
      </main>
    `
  })
}
