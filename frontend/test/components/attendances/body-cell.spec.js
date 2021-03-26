import BodyCell from 'components/attendances/body-cell'

describe('BodyCell', () => {
  const attendanceDay = {
    id: '2019-01-01',
    type: 'attendance-days',
    attributes: {
      day: '2019-01-01',
      kind: 'holiday-day'
    }
  }
  const attendanceEventForDay = jest.fn()
  const factory = () => {
    return createWrapper(BodyCell, {
      mocks: {
        $store: {
          getters: {
            attendanceEventForDay
          }
        }
      }
    })
  }
  beforeEach(() => {
    entry.mockReturnValue(attendanceDay)
  })

  test('render day kind class', () => {
    expect(factory().html()).toContain('class="holiday-day')
  })

  test('render table cell', () => {
    expect(factory().html()).toContain('<td')
  })
})
