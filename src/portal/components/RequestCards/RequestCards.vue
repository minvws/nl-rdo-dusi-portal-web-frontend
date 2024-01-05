<template>
  <div class="cards">
    <div
      v-for="(row, j) in items"
      :key="`${j}`"
      class="card"
    >
      <AppHtml
        class="card-title"
        as="h3"
        :html="row[0].text"
      />
      <div
        v-for="({ component, label, icon, ...data }, i) in row"
        :key="`${j}-${i}`"
        class="card-row"
      >
        <div
          class="card-name"
          v-if="label"
        >
          {{ label }}
        </div>
        <div
          class="card-component"
          :class="[icon, { 'has-icon': icon, 'with-label': !!label }]"
        >
          <span v-if="icon" />
          <component
            :is="component"
            v-bind="data"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { Column } from '@shared/types/table'

import { computed } from 'vue'
import AppHtml from '@shared/components/AppHtml/AppHtml.vue'
import { log } from '@shared/utils/logger'

type Type = 'external-link' | 'string' | 'date' | 'button-link' | 'link'
type Text = { text: string }
type ExternalLink = { to: string } & Text
type AppHtmlContent = { icon?: string } & Text

type Props = {
  headings: Column[]
  data: any[]
}
const props = defineProps<Props>()

const labels = computed<Record<string, string>>(() =>
  props.headings.reduce((cul, { id, text }) => ({ ...cul, [id]: text }), {})
)

const toExternalLink = ({ to, text }: ExternalLink) => ({
  component: 'a',
  href: to,
  text
})

const toButtonLink = ({ type, ...params }: any) => ({
  component: 'RouterLink',
  className: ['button', type].join(' '),
  ...params
})

const toAppHtml = ({ text, icon }: AppHtmlContent) => ({
  component: AppHtml,
  html: `<b>${text}</b>`,
  icon,
  as: 'div'
})

const getComponent = (params: { type: Type } & any) => {
  switch (params.type) {
    case 'external-link':
      return toExternalLink(params as ExternalLink)
    case 'link':
    case 'button-link':
      return toButtonLink(params as ExternalLink)
    case 'date':
    case 'string':
      return toAppHtml(params as AppHtmlContent)
    default:
      log('error', `Unknown type: ${params.type}`)
  }
}

const items = computed(() =>
  props.data.map(row =>
    Object.entries(row)
      .map(([id, item]: [string, any]) => {
        const component = getComponent(item)
        if (!component) return undefined
        return {
          ...component,
          label: id === 'action' ? undefined : labels.value[id]
        }
      })
      .filter(item => !!item)
  )
)
</script>

<style lang="scss" scoped>
.cards {
  width: 100%;
}

.card {
  width: 100%;
  max-width: var(--max-line-length-max-width);
  margin: 0 0 1em 0;
  padding-top: 1rem;
  padding-bottom: 0.5rem;
  border: 1px solid var(--grey-2);

  .has-icon,
  .html {
    display: inline-block;
  }

  .error {
    color: var(--notification-error-intense-default, #d52a1e);
  }

  .confirmation {
    color: var(--notification-success-intense-default, #348834);
  }
}

.card-title {
  padding-bottom: 1rem;
}

.card-row {
  display: block;
  width: 100%;
  border-bottom: 1px solid var(--grey-2);

  &:last-child {
    border: none;
  }
}

.card-name {
  --width: 140px;

  display: inline-flex;
  width: var(--width);
  height: 100%;
  padding: 0.7rem 0;

  @include desktop {
    --width: 236px;
  }
}

.card-component {
  --width: 140px;

  display: inline-flex;
  width: 100%;
  padding: 0.7rem 0;
  border: none;
  background-color: transparent;

  @include desktop {
    --width: 236px;
  }

  @include mobile {
    .button-link {
      width: 100%;
    }
  }

  &.with-label {
    width: calc(100% - var(--width));
  }
}
</style>
