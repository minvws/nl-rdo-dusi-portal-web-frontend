<template>
  <Transition
    name="modal"
    appear
  >
    <component
      v-if="content"
      :ref="modalStore.setElement"
      :is="component"
      class="modal"
      @click.prevent="onClickOutside"
    >
      <Transition
        name="content"
        mode="out-in"
        appear
      >
        <div
          class="modal-wrapper"
          :key="key"
          @keyup.space="pressFirstButton"
        >
          <div
            class="modal-content"
            :class="modalTypeClass"
            role="group"
            :aria-label="ariaLabel"
            @click.stop
          >
            <div class="modal-content__icon">
              <span class="icon" />
            </div>
            <div class="modal-content__wrapper">
              <h2
                ref="title"
                tabindex="-1"
              >
                {{ content.title }}
              </h2>
              <p>{{ content.message }}</p>
              <component
                v-if="content.component"
                :is="content.component.name"
                v-bind="content.component.props"
              />
              <div class="buttons">
                <AppButton
                  v-for="({ label, action }, index) in content.buttons"
                  :key="index"
                  @click="action"
                >
                  {{ label }}
                </AppButton>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </component>
  </Transition>
</template>

<script setup lang="ts">
import { ModalType } from '@shared/types/modal'

import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import { useAppModalStore } from '@shared/store/useAppModalStore'

import AppButton from '@shared/components/AppButton/AppButton.vue'
import { storeToRefs } from 'pinia'

const { t } = useI18n()
const modalStore = useAppModalStore()
const { content, component } = storeToRefs(modalStore)

const title = ref<HTMLHeadingElement>()

const key = computed<string>(() => `${content.value?.title}-${content.value?.message}`)

const ariaLabel = computed<string>(() => t(`component.modal.aria-label.${content.value?.type}`))

const modalTypeClass = computed<string>(() => {
  const type = content.value?.type ?? ModalType.DEFAULT
  return type === ModalType.DEFAULT ? '' : type
})

function onClickOutside(): void {
  modalStore.onClickOutside()
}

function pressFirstButton(): void {
  content.value?.buttons?.[0]?.action()
}

watch(title, (newTitle, oldTitle) => {
  if (newTitle && !oldTitle) {
    newTitle.focus()
  }
})
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.2);

  .icon::before {
    width: 2em !important;
    max-width: 2em !important;
    height: 2em !important;
  }

  .modal-content__icon {
    font-size: var(--h2-font-size, inherit);
  }

  .buttons:not(:empty) {
    padding-top: 1em;
  }

  .modal-content__wrapper {
    flex: 1 1 auto;
  }
}

.modal-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.modal-content {
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  row-gap: 0.5em;
  column-gap: 0.5em;
  flex-direction: row;
  max-width: 600px;
  transform: translate(-50%, -50%);
}

.modal-content:not(.notification, .error, .warning, .confirmation, .explanation, .system) {
  width: 100%;
  background-color: var(--application-base-background-color);
  color: var(--notification-explanation-text-color);
  border-width: var(--notification-explanation-border-width);
  border-style: var(--notification-explanation-border-style);
  border-color: var(--notification-explanation-border-color);
  padding-top: var(--notification-block-element-padding-top);
  padding-right: var(--notification-block-element-padding-right);
  padding-bottom: var(--notification-block-element-padding-bottom);
  padding-left: var(--notification-block-element-padding-left);
  column-gap: 0;
}

// transitions
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.content-enter-active,
.content-leave-active {
  transform: scale(1);
  transition: all 0.2s ease;
}

.content-enter-from,
.content-leave-to {
  transform: scale(0.9);
  opacity: 0;
}
</style>
