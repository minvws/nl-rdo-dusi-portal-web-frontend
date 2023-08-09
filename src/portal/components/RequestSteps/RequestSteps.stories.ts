import type { Meta, StoryObj } from '@storybook/vue3'

import RequestSteps from './RequestSteps.vue'

const meta: Meta<typeof RequestSteps> = {
  title: 'portal/RequestSteps',
  component: RequestSteps
}

export default meta

type Story = StoryObj<typeof RequestSteps>

export const Default: Story = {
  render: args => ({
    components: { RequestSteps },
    setup() {
      return { args }
    },
    template: `
      <main>
        <section>
          <div>
            <RequestSteps v-bind="args" />
          </div>
        </section>
      </main>
    `
  }),
  args: {
    items: [
      {
        title: 'Step 1: Lorem ipsum dolor sit amet',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget tempor aliquam.',
        actions: {
          download: false,
          edit: true,
          cancel: true
        }
      },
      {
        title: 'Step 2: Consectetur adipiscing elit',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget tempor aliquam.',
        actions: {
          download: false,
          edit: false,
          cancel: true
        }
      },
      {
        title: 'Step 3: Donec euismod, nisl eget tempor aliquam',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget tempor aliquam.',
        actions: {
          download: true,
          edit: true,
          cancel: true
        }
      }
    ]
  }
}
