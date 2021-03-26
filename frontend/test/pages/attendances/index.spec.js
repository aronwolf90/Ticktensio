import Attendances from 'pages/attendances/index'
import UserCell from 'components/attendances/user-cell'
import HeaderCell from 'components/attendances/header-cell'
import BodyCell from 'components/attendances/body-cell'

describe('pages/attendances/index.vue', () => {
  const user = {
    id: '1',
    type: 'users',
    attributes: {
      firstname: 'user'
    }
  }
  const attendanceDay = {
    id: '2019-01-01',
    type: 'attendance-days',
    attributes: {
      day: '2019-01-01'
    }
  }
  const factory = () => {
    const wrapper = createWrapper(Attendances, {
      stubs: {
        UserCell: true,
        HeaderCell: true,
        BodyCell: true
      },
      mocks: {
        $store: {
          dispatch,
          getters: {
            users: [user],
            entry: () => attendanceDay
          }
        }
      }
    })
    wrapper.setData({ attendanceDayRefs: [attendanceDay] })
    return wrapper
  }

  beforeEach(() => {
    when(dispatch)
      .calledWith('attendanceEvents')
      .mockResolvedValue([])
      .calledWith('users')
      .mockResolvedValue([user])
  })

  it('render UserCell', async () => {
    const wrapper = factory()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    console.log(wrapper.html())
    console.log(wrapper.vm.attendanceDayRefs)
    expect(wrapper.findComponent(UserCell).exists()).toBeTruthy()
  })
  it('render HeaderCell', async () => {
    const wrapper = factory()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    console.log(wrapper.vm.attendanceDays)
    expect(wrapper.findComponent(HeaderCell).exists()).toBeTruthy()
  })

  it('render BodyCell', async () => {
    const wrapper = factory()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    expect(wrapper.findComponent(BodyCell).exists()).toBeTruthy()
  })
})
