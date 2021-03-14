import PagesRecordsIndex from 'pages/records/index'

/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */

describe('pages/records/index', () => {
  const relationship = sandbox.stub()
  const factory = ({ monthSpentTime = 0, recordDays = [] }) => {
    return createWrapper(PagesRecordsIndex, {
      mocks: {
        $store: {
          getters: {
            'recordsIndex/monthSpentTime': monthSpentTime,
            'recordsIndex/recordDays': recordDays,
            relationship
          }
        }
      }
    })
  }

  describe('monthSpentTime', () => {
    it('renders correctly when monthSpentTime is one minute', () => {
      const wrapper = factory({ monthSpentTime: 60 })

      expect(wrapper.html()).to.include('00:01:00')
    })

    it('renders correctly when monthSpentTime is one hour', () => {
      const wrapper = factory({ monthSpentTime: 3600 })

      expect(wrapper.html()).to.include('01:00:00')
    })

    it('renders correctly when monthSpentTime is 100 hours', () => {
      const wrapper = factory({ monthSpentTime: 100 * 3600 })

      expect(wrapper.html()).to.include('100:00:00')
    })
  })

  it('renders the new btn', () => {
    const wrapper = factory(PagesRecordsIndex)

    expect(wrapper.html()).to.include('/administration/records/new"')
    expect(wrapper.html()).to.include('New record')
  })

  it('renders the csv btn', () => {
    const wrapper = factory(PagesRecordsIndex)

    expect(wrapper.find('a[href="/administration/records.csv"]').exists()).to.be.true
    expect(wrapper.html()).to.include('fa fa-file-excel-o')
  })

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
    relationship.returns([record])
    const wrapper = factory({ recordDays: [recordDay] })

    expect(wrapper.html()).to.include('10-10-2020')
    expect(wrapper.html()).to.include('01:00:00')
    expect(wrapper.html()).to.include('Test description')
    expect(wrapper.html()).to.include('10:00')
    expect(wrapper.html()).to.include('11:00')
    expect(wrapper.html()).to.include('/administration/records/1/edit')
  })
})
