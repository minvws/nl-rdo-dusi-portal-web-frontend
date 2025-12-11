import { describe, expect, it } from 'vitest'

import DescriptionList from '@shared/components/DescriptionList/DescriptionList.vue'
import { mount } from '@vue/test-utils'

import { DescriptionListDetailsFieldType } from '@shared/types/details'

describe('DescriptionList', () => {
  it('can render all field types', () => {
    const wrapper = mount(DescriptionList, {
      props: {
        items: [
          {
            term: 'Term 1',
            type: DescriptionListDetailsFieldType.DATE,
            text: '2024-01-01T12:00:00.000Z'
          },
          {
            term: 'Term 2',
            type: DescriptionListDetailsFieldType.FILE,
            text: 'Text 2',
            field: 'field-id',
            files: [
              {
                name: 'file-name',
                id: 'file-id',
                mimeType: 'text/plain'
              }
            ],
            formId: 'form-id'
          },
          {
            term: 'Term 3',
            type: DescriptionListDetailsFieldType.STRING,
            text: 'Text 3'
          },
          {
            term: 'Term 4',
            type: DescriptionListDetailsFieldType.URL,
            text: 'Text 4',
            url: 'https://example.com'
          }
        ]
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
