import BodyCell from 'attendances/body_cell'

/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */

describe('BodyCell', () => {
  const attendanceDay = {
    id: '2019-01-01',
    type: 'attendance-days',
    attributes: {
      day: '2019-01-01',
      kind: 'holiday-day'
    }
  }
  const entry = sandbox.stub()
  const attendanceEventForDay = sandbox.stub()
  const factory = () => {
    return createWrapper(BodyCell, {
      mocks: {
        $store: {
          getters: {
            entry,
            attendanceEventForDay
          }
        }
      }
    })
  }
  beforeEach(() => {
    entry.returns(attendanceDay)
  })

  it('render day kind class', () => {
    expect(factory().html()).to.include('class="holiday-day')
  })

  it('render table cell', () => {
    expect(factory().html()).to.include('<td')
  })
})
