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
import type { ComputedRef } from 'vue'
import type { Column } from '@shared/types/table'

import { computed } from 'vue'
import AppHtml from '@shared/components/AppHtml/AppHtml.vue'

type Type = 'external-link' | 'string' | 'date' | 'button-link' | 'link'
type Text = { text: string }
type ExternalLink = { to: string } & Text

type Props = {
  headings: Column[]
  data: any[]
}
const props = defineProps<Props>()

const labels: ComputedRef<Record<string, string>> = computed(() =>
  props.headings.reduce((cul, { id, text }) => ({ ...cul, [id]: text }), {})
)

const toExternalLink = ({ to, text }: ExternalLink) => {
  return {
    component: 'a',
    href: to,
    text
  }
}

const toButtonLink = ({ type, ...params }: any) => {
  return {
    component: 'RouterLink',
    className: ['button', type].join(' '),
    ...params
  }
}

const toAppHtml = ({ text, icon }: Text & { icon?: string }) => {
  return {
    component: AppHtml,
    html: `<b>${text}</b>`,
    icon,
    as: 'div'
  }
}

const getComponent = (params: { type: Type } & any) => {
  switch (params.type) {
    case 'external-link':
      return toExternalLink(params as ExternalLink)
    case 'link':
    case 'button-link':
      return toButtonLink(params as ExternalLink)
    case 'date':
    case 'string':
      return toAppHtml(params as Text)
  }
}

const items = computed(() => {
  return props.data.map(row => {
    return Object.entries(row)
      .map(([id, item]: [string, any]) => {
        const component = getComponent(item)
        if (!component) return undefined
        return {
          ...component,
          label: id === 'action' ? undefined : labels.value[id]
        }
      })
      .filter(item => !!item)
  })
})
</script>

<style lang="scss" scoped>
$padding: 0.7rem 0;
.cards {
  width: 100%;
}
.card {
  --width: 140px;
  @include desktop {
    --width: 236px;
  }

  width: 100%;
  max-width: var(--max-line-length-max-width);
  padding-top: 1rem;
  padding-bottom: 0.5rem;
  margin: 0 0 1em 0;
  border: 1px solid var(--grey-2);

  &-title {
    padding-bottom: 1rem;
  }

  &-row {
    width: 100%;
    display: block;
    border-bottom: 1px solid var(--grey-2);

    &:last-child {
      border: none;
    }
  }

  &-name {
    display: inline-flex;
    height: 100%;
    width: var(--width);
    padding: $padding;
  }

  &-component {
    display: inline-flex;
    width: 100%;
    padding: $padding;
    background-color: transparent;
    border: none;

    &.with-label {
      width: calc(100% - var(--width));
    }

    @include mobile {
      .button-link {
        width: 100%;
      }
    }
  }

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
</style>
