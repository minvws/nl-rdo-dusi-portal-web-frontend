<template>
  <dl class="transition-history">
    <div class="inner">
      <dt>
        <time :datetime="item.date">
          {{ item.formattedDate }}
        </time>
      </dt>
      <dd>
        <p>
          <strong>{{ item.description }}</strong>
        </p>
        <template
          v-for="({ title, assessor }, index) in item.items"
          :key="`history-item-${index}`"
        >
          <p v-if="assessor">
            <small class="assessor">{{
              translate('component.transitionHistory.stage', { title, assessor })
            }}</small>
          </p>
          <NewLineToBr
            v-if="item.internalNote"
            as="p"
            :text="item.internalNote"
          />

          <AppButton
            v-if="item.message?.id"
            class="ghost"
            @click="onDownload(item.message?.id)"
          >
            <AppIcon name="pdf-file" />
            {{ item.message?.subject }}
          </AppButton>
        </template>
      </dd>
    </div>
  </dl>
</template>

<script lang="ts">
import type { ControlElement } from '@jsonforms/core'
import type { HistoryTransitionItem } from '@shared/types/history-transition'

import { defineComponent } from 'vue'
import { rendererProps, useJsonFormsControl } from '@jsonforms/vue'
import { useVanillaControl } from '@jsonforms/vue-vanilla'

import { useFetchMessageDownload } from '@assessment/composables/useFetchMessageDownload'

import { translate } from '@shared/i18n'
import { openExternalLink } from '@shared/utils/link'

import AppButton from '@shared/components/AppButton/AppButton.vue'
import AppIcon from '@shared/components/AppIcon/AppIcon.vue'
import NewLineToBr from "@shared/components/NewLineToBr/NewLineToBr.vue"

export default defineComponent({
  data: () => ({
    fileURL: ''
  }),
  components: { NewLineToBr, AppButton, AppIcon },
  props: {
    ...rendererProps<ControlElement>()
  },
  setup(props) {
    return {
      ...useVanillaControl(useJsonFormsControl(props))
    }
  },
  methods: {
    translate,
    async onDownload(id: string) {
      const { data, error, isFetching } = await useFetchMessageDownload(id)

      if (error.value) {
        console.error(error.value)
        return
      }

      if (!isFetching.value && data.value) {
        const file = new Blob([data.value], { type: 'application/pdf' })
        this.fileURL = URL.createObjectURL(file)
        openExternalLink(this.fileURL, '_blank')
      }
    }
  },
  computed: {
    item() {
      return this.appliedOptions?.item as HistoryTransitionItem
    }
  }
})
</script>

<style lang="scss" scoped>
.assessor {
  color: var(--grey-6);
}

.inner {
  padding: 1rem 0;
}

.ghost {
  --form-button-font-weight: 400;
}
</style>
