import type { LocationAsRelativeRaw } from 'vue-router'

export type MessagesItem = {
  date: string
  formattedDate?: string
  title: string
  to: LocationAsRelativeRaw
  unread: boolean
}

export type MessagesData = MessagesItem[]

export type RawMessagesItem = {
  id: string
  isNew: boolean
  sentAt: string
  subject: string
}

export type RawMessagesData = RawMessagesItem[]
