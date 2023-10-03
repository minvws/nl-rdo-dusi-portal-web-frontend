import type { Meta, StoryObj } from '@storybook/vue3'

import SearchDataList from './SearchDataList.vue'

const meta: Meta<typeof SearchDataList> = {
  title: 'core/SearchDataList',
  component: SearchDataList
}

export default meta

type Story = StoryObj<typeof SearchDataList>

export const Default: Story = {
  render: args => ({
    components: { SearchDataList },
    setup() {
      return { args }
    },
    template: '<SearchDataList v-bind="args" />'
  }),
  argTypes: { onSelect: { action: 'item selected' } },
  args: {
    label: 'Zoek op naam',
    options: [
      'Anna De Jong',
      'Anna Vos',
      'Emma Smit',
      'Emma Vos',
      'Hendrik Jansen',
      'Hendrik Peters',
      'Jan De Jong',
      'Jan Kok',
      'Johannes Bakker',
      'Johannes Peters',
      'Lotte Bakker',
      'Lotte Smit',
      'Maria Jansen',
      'Maria Meijer',
      'Pieter Kok',
      'Pieter Vos',
      'Sophie Kok',
      'Sophie Meijer',
      'Willem Meijer',
      'Willem Smit'
    ],
    placeholder: 'Zoeken...'
  }
}
