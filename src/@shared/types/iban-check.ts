export type RawIbanCheckItem = {
  applications: {
    id: string
    reference: string
  }[]
  count: string
  hash: string
}

export type RawIbanCheck = RawIbanCheckItem[]

export type IbanCheckItem = {
  count: {
    type: string
    text: string
  }
  applications: {
    type: string
    list: {
      type: string
      to: {
        name: string
        params: { id: string }
      }
      text: string
    }[]
  }
}

export type IbanCheck = IbanCheckItem[]
