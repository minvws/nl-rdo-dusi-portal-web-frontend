import type { Meta, StoryObj } from '@storybook/vue3'

import BreadcrumbBar from './BreadcrumbBar.vue'

const meta: Meta<typeof BreadcrumbBar> = {
  title: 'BreadcrumbBar',
  component: BreadcrumbBar
}

export default meta

type Story = StoryObj<typeof BreadcrumbBar>

export const Default: Story = {
  render: args => ({
    components: { BreadcrumbBar },
    setup() {
      return { args }
    },
    template: '<BreadcrumbBar v-bind="args" />'
  }),
  args: {
    links: [
      { label: 'Home', to: '/' },
      { label: 'Lorem', to: '/lorem' },
      { label: 'Ipsum', to: '/ipsum' }
    ]
  }
}
