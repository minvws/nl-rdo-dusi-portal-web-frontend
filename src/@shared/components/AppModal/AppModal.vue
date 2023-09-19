<template>
  <Transition
    name="modal"
    appear
  >
    <component
      v-if="modal.content"
      :ref="modal.setElement"
      :is="modal.component"
      class="modal"
      @click="modal.onClickOutside"
    >
      <Transition
        name="content"
        mode="out-in"
        appear
      >
        <div
          class="modal-wrapper"
          :key="`${modal.content.title}-${modal.content.message}`"
          @keyup.space="pressFirstButton"
        >
          <div
            class="modal-content"
            role="group"
            :aria-label="translate(`component.modal.aria-label.${modal.content.type}`)"
            :class="modal.content.type"
          >
            <div class="icon-wrapper">
              <span class="icon" />
            </div>
            <div>
              <h2
                ref="title"
                tabindex="-1"
              >
                {{ modal.content.title }}
              </h2>
              <p>{{ modal.content.message }}</p>
              <div class="buttons">
                <AppButton
                  v-for="({ label, action }, index) in modal.content.buttons"
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
import { ref, watch } from 'vue'
import { translate } from '@shared/i18n'
import AppButton from '@shared/components/AppButton/AppButton.vue'
import { useAppModal } from '@shared/store/useAppModal'

const modal = useAppModal()

const title = ref<HTMLHeadingElement>()

watch(title, (current, previous) => {
  if (current && !previous) {
    current.focus()
  }
})

function pressFirstButton() {
  modal?.content?.buttons?.[0]?.action()
}
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.2);
  z-index: 2;

  .icon {
    &-wrapper {
      font-size: var(--h2-font-size, inherit);
    }
    &::before {
      width: 2em !important;
      height: 2em !important;
      max-width: 2em !important;
    }
  }

  .buttons {
    padding-top: 1em;
  }

  &-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &-content {
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    flex-direction: row;
    gap: 0.5em;
    max-width: 600px;
    transform: translate(-50%, -50%);
  }
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
