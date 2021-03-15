import HeaderCell from 'attendances/header_cell'

/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */

describe('HeaderCell', () => {
  const attendanceDay = {
    id: '2019-01-01',
    type: 'attendance-days',
    attributes: {
      day: '2019-01-01',
      kind: 'holiday-day'
    }
  }
  const entry = sandbox.stub()
  const factory = () => {
    return createWrapper(HeaderCell, {
      mocks: {
        $store: {
          getters: {
            entry
          }
        }
      }
    })
  }
  beforeEach(() => {
    entry.returns(attendanceDay)
  })

  it('render the element', () => {
    expect(factory().html()).to.include('class="text-nowrap holiday-day">Tue 1</td>')
  })
})
