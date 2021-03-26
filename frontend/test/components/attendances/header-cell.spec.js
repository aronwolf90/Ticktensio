import HeaderCell from 'components/attendances/header-cell'

describe('HeaderCell', () => {
  const attendanceDay = {
    id: '2019-01-01',
    type: 'attendance-days',
    attributes: {
      day: '2019-01-01',
      kind: 'holiday-day'
    }
  }
  const factory = () => {
    return createWrapper(HeaderCell, {
      propsData: {
        attendanceDayId: '2019-01-01',
        attendanceDayType: 'attendance-days'
      }
    })
  }
  beforeEach(() => {
    entry.mockReturnValue(attendanceDay)
  })

  test('render the element', () => {
    expect(factory().html()).toContain('class="text-nowrap holiday-day">Tue 1</td>')
  })
})
