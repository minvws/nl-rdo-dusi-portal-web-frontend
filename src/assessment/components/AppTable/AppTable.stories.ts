import type { Meta, StoryObj } from '@storybook/vue3'

import AppTable from './AppTable.vue'

const meta: Meta<typeof AppTable> = {
  title: 'AppTable',
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
      { field: 'dossier', text: 'Dossier', sortable: true },
      { field: 'regeling', text: 'Regeling', sortable: true },
      { field: 'status', text: 'Status', sortable: true },
      { field: 'deadline', text: 'Deadline', sortable: true },
      { field: 'update', text: 'Laatste Update', sortable: true },
      { field: 'actie', text: 'Actie', sortable: false }
    ],
    data: [
      {
        dossier: { type: 'link', url: '/', text: 'dfykqM' },
        regeling: { type: 'link', url: '/', text: 'AAA' },
        status: { type: 'string', text: 'Eerste beoordeling' },
        deadline: { type: 'date', text: '01/01/2024' },
        update: { type: 'date', text: '21/07/2023' },
        actie: { type: 'button', url: '/', text: 'Start beoordeling' }
      },
      {
        dossier: { type: 'link', url: '/', text: 'NAgfqB' },
        regeling: { type: 'link', url: '/', text: 'BTE' },
        status: { type: 'string', text: 'Tweede beoordeling' },
        deadline: { type: 'date', text: '05/01/2024' },
        update: { type: 'date', text: '21/07/2023' },
        actie: { type: 'button', url: '/', text: 'Start beoordeling' }
      },
      {
        dossier: { type: 'link', url: '/', text: 'EOlIRH' },
        regeling: { type: 'link', url: '/', text: 'BTE' },
        status: { type: 'string', text: 'Tweede beoordeling' },
        deadline: { type: 'date', text: '03/01/2024' },
        update: { type: 'date', text: '21/07/2023' },
        actie: { type: 'button', url: '/', text: 'Start beoordeling' }
      },
      {
        dossier: { type: 'link', url: '/', text: '56EVVJ' },
        regeling: { type: 'link', url: '/', text: 'CCC' },
        status: { type: 'string', text: 'Eerste beoordeling' },
        deadline: { type: 'date', text: '04/01/2024' },
        update: { type: 'date', text: '20/07/2023' },
        actie: { type: 'button', url: '/', text: 'Start beoordeling' }
      },
      {
        dossier: { type: 'link', url: '/', text: 'AjeNjQ' },
        regeling: { type: 'link', url: '/', text: 'AAA' },
        status: { type: 'string', text: 'Eerste beoordeling' },
        deadline: { type: 'date', text: '02/01/2024' },
        update: { type: 'date', text: '20/07/2023' },
        actie: { type: 'button', url: '/', text: 'Start beoordeling' }
      }
    ],
    itemsPerPage: 10
  }
}
