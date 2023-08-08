<template>
  <div class="horizontal-scroll">
    <table>
      <AppHtml
        v-if="caption"
        as="caption"
        :html="caption"
      />
      <thead>
        <tr>
          <th
            v-for="(heading, index) in headings"
            :key="index"
            :scope="heading.scope"
          >
            {{ heading.text }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, index) in items"
          :key="index"
        >
          <td
            v-for="(cell, cellIndex) in row"
            :key="cellIndex"
          >
            <RouterLink
              v-if="cell.link"
              :to="cell.link"
            >
              <span
                v-if="cell.icon"
                class="visually-hidden"
              >
                {{ cell.text }}
              </span>
              <template v-else>
                {{ cell.text }}
              </template>
              <AppIcon
                v-if="cell.icon"
                :name="cell.icon"
              />
            </RouterLink>
            <template v-else>
              {{ cell.text }}
              <AppIcon
                v-if="cell.icon"
                :name="cell.icon"
              />
            </template>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr
          v-for="(row, index) in footer"
          :key="index"
        >
          <td
            v-for="(cell, cellIndex) in row"
            :key="cellIndex"
          >
            {{ cell.text }}
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script setup lang="ts">
import AppIcon from '@/shared/components/AppIcon/AppIcon.vue'
import AppHtml from '@/shared/components/AppHtml/AppHtml.vue'

type TableCell = {
  icon?: string
  link?: string
  text: string
}

type TableCellHeadingProps = TableCell & {
  scope?: 'col' | 'row'
}

export type TableRowProps = TableCell[]

type Props = {
  caption?: string
  footer?: TableRowProps[] | null
  headings: TableCellHeadingProps[]
  items: TableRowProps[]
}

defineProps<Props>()
</script>

<style lang="scss" scoped>
td > a {
  display: inline-block;
}
</style>
