import type { Meta, StoryObj } from '@storybook/vue3'

import AppIcon from './AppIcon.vue'

const meta: Meta<typeof AppIcon> = {
  title: 'AppIcon',
  component: AppIcon
}

const icons = [
  'ascending',
  'descending',
  'sort',
  'check',
  'home',
  'pinterest',
  'twitter',
  'twitter-inverse',
  'flickr',
  'youtube',
  'instagram',
  'facebook',
  'chevron-light-right',
  'chevron-light-left',
  'chevron-light-top',
  'chevron-light-bottom',
  'chevron-left',
  'hamburger',
  'chevron-right',
  'questionmark',
  'speech',
  'arrow-down',
  'arrow-up',
  'arrow-right',
  'arrow-left',
  'map',
  'outgoing',
  'pause',
  'trash',
  'user',
  'chevron-up',
  'chevron-down',
  'plus',
  'calendar',
  'download',
  'heart',
  'letter',
  'reset',
  'play',
  'search',
  'clock',
  'close',
  'line',
  'smartphone',
  'lock-closed',
  'on-off',
  'to-top',
  'grid',
  'list',
  'csv-file',
  'html-file',
  'pdf-file',
  'document',
  'bar-graph',
  'tree-graph',
  'grid-view',
  'list-view'
]

export default meta

type Story = StoryObj<typeof AppIcon>

export const Default: Story = {
  render: () => ({
    components: { AppIcon },
    setup() {
      return { icons }
    },
    template: `
      <div style="display: grid;grid-template-columns: repeat(auto-fit, minmax(100px, max-content));grid-gap: 32px;">
        <div v-for="icon in icons" :key="icon" style="display: flex; flex-direction: column;justify-content: center;text-align: center;">
          <AppIcon :name="icon" />
          <span>{{ icon }}</span>
        </div>
      </div>
    `
  })
}
