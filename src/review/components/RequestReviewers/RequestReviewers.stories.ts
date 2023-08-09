import type { Meta, StoryObj } from '@storybook/vue3'

import RequestReviewers from './RequestReviewers.vue'

const meta: Meta<typeof RequestReviewers> = {
  title: 'RequestReviewers',
  component: RequestReviewers
}

export default meta

type Story = StoryObj<typeof RequestReviewers>

export const Default: Story = {
  render: args => ({
    components: { RequestReviewers },
    setup() {
      return { args }
    },
    template: `
      <main>
        <section>
          <div>
            <RequestReviewers v-bind="args" />
          </div>
        </section>
      </main>
    `
  }),
  args: {
    reviewer: 'John Doe'
  }
}
