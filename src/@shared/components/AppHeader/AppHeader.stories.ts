import type { Meta, StoryObj } from '@storybook/vue3'

import AppHeader from './AppHeader.vue'

const meta: Meta<typeof AppHeader> = {
  title: 'portal/AppHeader',
  component: AppHeader
}

export default meta

type Story = StoryObj<typeof AppHeader>

export const Default: Story = {
  render: () => ({
    components: { AppHeader },
    template: `
      <body>
        <Suspense>
          <AppHeader />
        </Suspense>
      </body>
    `
  })
}
