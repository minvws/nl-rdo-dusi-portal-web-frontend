import type { Meta, StoryObj } from '@storybook/vue3'

import CaseReviewers from './CaseReviewers.vue'

const meta: Meta<typeof CaseReviewers> = {
  title: 'assessment/CaseReviewers',
  component: CaseReviewers
}

export default meta

type Story = StoryObj<typeof CaseReviewers>

export const Default: Story = {
  render: args => ({
    components: { CaseReviewers },
    setup() {
      return { args }
    },
    template: `
      <main>
        <section>
          <div>
            <CaseReviewers v-bind="args" />
          </div>
        </section>
      </main>
    `
  }),
  args: {
    name: 'John Doe'
  }
}
