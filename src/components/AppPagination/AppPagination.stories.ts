import type { Meta, StoryObj } from '@storybook/vue3'

import AppPagination from './AppPagination.vue'

const meta: Meta<typeof AppPagination> = {
  title: 'AppPagination',
  component: AppPagination
}

export default meta

type Story = StoryObj<typeof AppPagination>

export const Default: Story = {
  render: args => ({
    components: { AppPagination },
    setup() {
      return { args }
    },
    template: '<AppPagination v-bind="args" />',
  }),
  args: {
    itemsTotal: 100,
    pageSize: 10,
    startPage: 1,
  }
}

export const WithButtons: Story = {
  render: args => ({
    components: { AppPagination },
    setup() {
      return { args }
    },
    template: '<AppPagination v-bind="args" with-buttons />',
  }),
  args: {
    itemsTotal: 100,
    pageSize: 10,
    startPage: 1,
  }
}
