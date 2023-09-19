import type { Meta, StoryObj } from '@storybook/vue3'

import AppTable from './AppTable.vue'

const meta: Meta<typeof AppTable> = {
  title: 'core/AppTable',
  component: AppTable
}

export default meta

type Story = StoryObj<typeof AppTable>

export const Default: Story = {
  render: args => ({
    components: { AppTable },
    setup() {
      return { args }
    },
    template: '<AppTable v-bind="args" />'
  }),
  args: {
    columns: [
      { id: 'dossier', text: 'Dossier', sortable: true },
      { id: 'regeling', text: 'Regeling', sortable: true },
      { id: 'status', text: 'Status', sortable: true },
      { id: 'deadline', text: 'Deadline', sortable: true },
      { id: 'update', text: 'Laatste Update', sortable: true },
      { id: 'actie', text: 'Actie', sortable: false }
    ],
    data: [
      {
        dossier: { type: 'link', to: '/', text: 'dfykqM' },
        regeling: { type: 'link', to: '/', text: 'AAA' },
        status: { type: 'string', text: 'Eerste beoordeling' },
        deadline: { type: 'date', text: '01/01/2024' },
        update: { type: 'date', text: '21/07/2023' },
        actie: { type: 'button', to: '/', text: 'Start beoordeling' }
      },
      {
        dossier: { type: 'link', to: '/', text: 'NAgfqB' },
        regeling: { type: 'link', to: '/', text: 'BTE' },
        status: { type: 'string', text: 'Tweede beoordeling' },
        deadline: { type: 'date', text: '05/01/2024' },
        update: { type: 'date', text: '21/07/2023' },
        actie: { type: 'button', to: '/', text: 'Start beoordeling' }
      },
      {
        dossier: { type: 'link', to: '/', text: 'EOlIRH' },
        regeling: { type: 'link', to: '/', text: 'BTE' },
        status: { type: 'string', text: 'Tweede beoordeling' },
        deadline: { type: 'date', text: '03/01/2024' },
        update: { type: 'date', text: '21/07/2023' },
        actie: { type: 'button', to: '/', text: 'Start beoordeling' }
      },
      {
        dossier: { type: 'link', to: '/', text: '56EVVJ' },
        regeling: { type: 'link', to: '/', text: 'CCC' },
        status: { type: 'string', text: 'Eerste beoordeling' },
        deadline: { type: 'date', text: '04/01/2024' },
        update: { type: 'date', text: '20/07/2023' },
        actie: { type: 'button', to: '/', text: 'Start beoordeling' }
      },
      {
        dossier: { type: 'link', to: '/', text: 'AjeNjQ' },
        regeling: { type: 'link', to: '/', text: 'AAA' },
        status: { type: 'string', text: 'Eerste beoordeling' },
        deadline: { type: 'date', text: '02/01/2024' },
        update: { type: 'date', text: '20/07/2023' },
        actie: { type: 'button', to: '/', text: 'Start beoordeling' }
      }
    ],
    itemsPerPage: 10
  }
}
