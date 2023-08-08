import type { Meta, StoryObj } from '@storybook/vue3'

import AppIcon from './AppIcon.vue'

const meta: Meta<typeof AppIcon> = {
  title: 'AppIcon',
  component: AppIcon
}

const icons = [
  'arrow-down',
  'arrow-left',
  'arrow-right',
  'arrow-up',
  'ascending',
  'bar-graph',
  'calendar',
  'check',
  'chevron-down',
  'chevron-left',
  'chevron-light-bottom',
  'chevron-light-left',
  'chevron-light-right',
  'chevron-light-top',
  'chevron-right',
  'chevron-up',
  'clock',
  'close',
  'csv-file',
  'descending',
  'document',
  'download',
  'facebook',
  'flickr',
  'grid-view',
  'grid',
  'hamburger',
  'heart',
  'home',
  'html-file',
  'instagram',
  'letter',
  'line',
  'list-view',
  'list',
  'lock-closed',
  'map',
  'on-off',
  'outgoing',
  'pause',
  'pdf-file',
  'pinterest',
  'play',
  'plus',
  'questionmark',
  'reset',
  'search',
  'smartphone',
  'sort',
  'speech',
  'to-top',
  'trash',
  'tree-graph',
  'twitter-inverse',
  'twitter',
  'user',
  'youtube'
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
