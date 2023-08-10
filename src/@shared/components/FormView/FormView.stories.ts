import type { Meta, StoryObj } from '@storybook/vue3'
import AppContent from '@shared/components/AppContent/AppContent.vue'
import LocalForm from '@portal/pages/LocalForm.vue'

const meta: Meta<typeof LocalForm> = {
  title: 'core/form/LocalForm',
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
