import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useRouter } from 'vue-router'

import AppTable from '@shared/components/AppTable/AppTable.vue'

const data = [
  {
    column_1: {
      type: 'string',
      text: 'string'
    },
    column_2: {
      type: 'link',
      to: 'https://www.dus-i.nl/subsidies/zorgmedewerkers-met-langdurige-post-covid-klachten',
      text: 'link'
    },
    column_3: {
      type: 'link-list',
      to: 'https://www.dus-i.nl/subsidies/zorgmedewerkers-met-langdurige-post-covid-klachten',
      text: 'external link'
    },
    column_4: {
      type: 'external-link',
      to: 'https://www.dus-i.nl/subsidies/zorgmedewerkers-met-langdurige-post-covid-klachten',
      text: 'external link'
    },
    column_5: {
      type: 'icon',
      to: 'https://www.dus-i.nl/subsidies/zorgmedewerkers-met-langdurige-post-covid-klachten',
      text: 'pdf-file'
    },
    column_6: {
      type: 'date',
      text: '1 januari 2024'
    },
    column_7: {
      type: 'button',
      text: 'button',
      action: {
        type: 'release',
        params: {
          id: '0499a536-e4cd-3ab7-8dad-ecb12cc1bf0e'
        }
      }
    },
    column_8: {
      type: 'button-link',
      to: {
        name: 'review-case',
        params: {
          id: '0499a536-e4cd-3ab7-8dad-ecb12cc1bf0e'
        }
      },
      text: 'button link'
    },
    column_9: {
      type: 'button-link-ghost',
      to: {
        name: 'review-case',
        params: {
          id: '0026193b-94b5-3589-8e6b-800301fb700d'
        }
      },
      text: 'button link ghost'
    }
  },
  {
    column_1: {
      type: 'string',
      text: 'string'
    },
    column_2: {
      type: 'link',
      to: 'https://www.dus-i.nl/subsidies/zorgmedewerkers-met-langdurige-post-covid-klachten',
      text: 'link'
    },
    column_3: {
      type: 'link-list',
      to: 'https://www.dus-i.nl/subsidies/zorgmedewerkers-met-langdurige-post-covid-klachten',
      text: 'external link'
    },
    column_4: {
      type: 'external-link',
      to: 'https://www.dus-i.nl/subsidies/zorgmedewerkers-met-langdurige-post-covid-klachten',
      text: 'external link'
    },
    column_5: {
      type: 'icon',
      to: 'https://www.dus-i.nl/subsidies/zorgmedewerkers-met-langdurige-post-covid-klachten',
      text: 'pdf-file'
    },
    column_6: {
      type: 'date',
      text: '2 januari 2024'
    },
    column_7: {
      type: 'button',
      text: 'button',
      action: {
        type: 'release',
        params: {
          id: '0499a536-e4cd-3ab7-8dad-ecb12cc1bf0e'
        }
      }
    },
    column_8: {
      type: 'button-link',
      to: {
        name: 'review-case',
        params: {
          id: '0499a536-e4cd-3ab7-8dad-ecb12cc1bf0e'
        }
      },
      text: 'button link'
    },
    column_9: {
      type: 'button-link-ghost',
      to: {
        name: 'review-case',
        params: {
          id: '0026193b-94b5-3589-8e6b-800301fb700d'
        }
      },
      text: 'button link ghost'
    }
  },
  {
    column_1: {
      type: 'string',
      text: 'string'
    },
    column_2: {
      type: 'link',
      to: 'https://www.dus-i.nl/subsidies/zorgmedewerkers-met-langdurige-post-covid-klachten',
      text: 'link'
    },
    column_3: {
      type: 'link-list',
      to: 'https://www.dus-i.nl/subsidies/zorgmedewerkers-met-langdurige-post-covid-klachten',
      text: 'external link'
    },
    column_4: {
      type: 'external-link',
      to: 'https://www.dus-i.nl/subsidies/zorgmedewerkers-met-langdurige-post-covid-klachten',
      text: 'external link'
    },
    column_5: {
      type: 'icon',
      to: 'https://www.dus-i.nl/subsidies/zorgmedewerkers-met-langdurige-post-covid-klachten',
      text: 'pdf-file'
    },
    column_6: {
      type: 'date',
      text: '3 januari 2024'
    },
    column_7: {
      type: 'button',
      text: 'button',
      action: {
        type: 'release',
        params: {
          id: '0499a536-e4cd-3ab7-8dad-ecb12cc1bf0e'
        }
      }
    },
    column_8: {
      type: 'button-link',
      to: {
        name: 'review-case',
        params: {
          id: '0499a536-e4cd-3ab7-8dad-ecb12cc1bf0e'
        }
      },
      text: 'button link'
    },
    column_9: {
      type: 'button-link-ghost',
      to: {
        name: 'review-case',
        params: {
          id: '0026193b-94b5-3589-8e6b-800301fb700d'
        }
      },
      text: 'button link ghost'
    }
  }
]

const columns = [
  {
    sortable: false,
    id: 'column_1',
    text: 'String'
  },
  {
    sortable: false,
    id: 'column_2',
    text: 'Link'
  },
  {
    sortable: false,
    id: 'column_3',
    text: 'Link list'
  },
  {
    sortable: false,
    id: 'column_4',
    text: 'External link'
  },
  {
    sortable: false,
    id: 'column_5',
    text: 'Icon'
  },
  {
    sortable: true,
    id: 'column_6',
    text: 'Datum'
  },
  {
    sortable: true,
    id: 'column_7',
    text: 'Button'
  },
  {
    sortable: false,
    id: 'column_8',
    text: 'Button link'
  },
  {
    sortable: false,
    id: 'column_9',
    text: 'Button link ghost'
  }
]

vi.mock('vue-router')

describe('AppTable', () => {
  vi.mocked(useRouter).mockReturnValue({
    push: vi.fn(),
    beforeEach: vi.fn()
  })

  beforeEach(() => {
    vi.mocked(useRouter().push).mockReset()
    vi.mocked(useRouter().beforeEach).mockReset()
  })

  it('can render with data', () => {
    const wrapper = mount(AppTable, {
      props: {
        columns,
        data
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('can render with no data', () => {
    const wrapper = mount(AppTable, {
      props: {
        columns,
        data: []
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('can have a caption', () => {
    const wrapper = mount(AppTable, {
      props: {
        columns,
        data,
        caption: 'Caption'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('triggers "sorting-change" event when clicking on a sortable column', async () => {
    const wrapper = mount(AppTable, {
      props: {
        columns,
        data,
        sortingId: 'column_6',
        sortingOrder: 'ascending'
      }
    })

    const columnButton = wrapper.find('th:nth-of-type(6) .button')
    await columnButton.trigger('click')

    expect(wrapper.emitted('sorting-change')).toHaveLength(1)
    expect(wrapper.emitted('sorting-change')).toEqual([
      [{ id: 'column_6', direction: 'descending' }]
    ])
  })
})
