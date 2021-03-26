import PagesRecordsIndex from 'components/records/index-body'

describe('components/records/index-body', () => {
  const factory = ({ monthSpentTime = 0, recordDays = [] }) => {
    return createWrapper(PagesRecordsIndex, {
      propsData: {
        recordDays: recordDays,
        paginationPageCount: 1,
        paginationCurrentPage: 1,
        fetchingPage: 1
      },
      stubs: {
        'b-pagination-nav': true
      }
    })
  }

  it('render record days with records', () => {
    const recordDay = {
      id: '1',
      type: 'record-days',
      attributes: {
        day: '10-10-2020',
        'spent-time': 3600
      }
    }
    const record = {
      id: '1',
      type: 'records',
      attributes: {
        description: 'Test description',
        'start-time': '2020-10-10T10:00:00.000+01:00',
        'end-time': '2020-10-10T11:00:00.000+01:00'
      },
      meta: {
        permissions: {
          update: true
        }
      }
    }
    relationship.mockReturnValue([record])
    const wrapper = factory({ recordDays: [recordDay] })

    expect(wrapper.html()).toContain('10-10-2020')
    expect(wrapper.html()).toContain('01:00:00')
    expect(wrapper.html()).toContain('Test description')
    expect(wrapper.html()).toContain('10:00')
    expect(wrapper.html()).toContain('11:00')
    expect(wrapper.html()).toContain('/administration/records/1/edit')
  })
})
