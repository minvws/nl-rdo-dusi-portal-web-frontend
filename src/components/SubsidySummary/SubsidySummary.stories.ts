import type { Meta, StoryObj } from '@storybook/vue3'

import SubsidySummary from './SubsidySummary.vue'

const meta: Meta<typeof SubsidySummary> = {
  title: 'SubsidySummary',
  component: SubsidySummary
}

export default meta
type Story = StoryObj<typeof SubsidySummary>

export const Default: Story = {
  render: args => ({
    components: { SubsidySummary },
    setup() {
      return { args }
    },
    template: `
      <main>
        <section>
          <div>
            <SubsidySummary v-bind="args" />
          </div>
        </section>
      </main>
    `
  }),
  args: {
    title: 'Lorem ipsum dolor sit amet',
    description:
      'Proin semper eget magna vitae maximus. Fusce in faucibus libero, in feugiat orci. Cras ligula sapien, egestas nec scelerisque non, egestas et ligula. Maecenas vel justo vitae risus facilisis scelerisque.',
    startDate: '01-02-2021',
    endDate: '01-02-2024',
    readMore: '/',
    form: {
      id: '1',
      version: 1
    }
  }
}
