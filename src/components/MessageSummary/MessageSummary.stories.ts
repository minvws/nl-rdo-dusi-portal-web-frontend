import type { Meta, StoryObj } from '@storybook/vue3'

import MessageSummary from './MessageSummary.vue'

const meta: Meta<typeof MessageSummary> = {
  title: 'MessageSummary',
  component: MessageSummary
}

export default meta
type Story = StoryObj<typeof MessageSummary>

export const Default: Story = {
  render: args => ({
    components: { MessageSummary },
    setup() {
      return { args }
    },
    template: `
      <main>
        <section>
          <div>
            <MessageSummary v-bind="args" />
          </div>
        </section>
      </main>
    `
  }),
  args: {
    description: 'Uw aanvraag is succesvol ingediend. De aanvraag is toegevoegd aan uw dossier',
    date: '01-02-2024',
    link: '/',
    title: 'Aanvraag ontvangen “Borstprothesen transvrouwen”'
  }
}
