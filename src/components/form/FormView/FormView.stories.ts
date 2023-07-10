import type { Meta, StoryObj } from '@storybook/vue3'
import AppContent from '@/components/AppContent/AppContent.vue'
import LocalForm from '@/pages/LocalForm.vue'

const meta: Meta<typeof LocalForm> = {
  title: 'forms/LocalForm',
  component: LocalForm
}

export default meta

type Story = StoryObj<typeof LocalForm>

export const Default: Story = {
  render: () => {
    return {
      components: { AppContent, LocalForm },
      template: '<AppContent><LocalForm /></AppContent>'
    }
  }
}
