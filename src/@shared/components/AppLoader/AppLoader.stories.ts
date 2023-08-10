import type { Meta, StoryObj } from '@storybook/vue3'

import AppLoader from './AppLoader.vue'

const meta: Meta<typeof AppLoader> = {
  title: 'core/AppLoader',
  component: AppLoader
}

export default meta

type Story = StoryObj<typeof AppLoader>

export const Default: Story = {
  render: () => ({
    components: { AppLoader },
    template: '<AppLoader />'
  })
}
