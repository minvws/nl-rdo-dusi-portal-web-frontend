import type { Meta, StoryObj } from '@storybook/vue3'

import AppHeaderLogoLink from './AppHeaderLogoLink.vue'

const meta: Meta<typeof AppHeaderLogoLink> = {
  title: 'core/AppHeaderLogoLink',
  component: AppHeaderLogoLink
}

export default meta

type Story = StoryObj<typeof AppHeaderLogoLink>

export const Default: Story = {
  render: () => ({
    components: { AppHeaderLogoLink },
    template: '<AppHeaderLogoLink />'
  })
}
