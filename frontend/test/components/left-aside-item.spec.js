import LeftAsideItem from 'components/left-aside-item'

describe('LeftAsideItem', () => {
  describe('is not the current one', () => {
    it('do not have active class', () => {
      const wrapper = createWrapper(LeftAsideItem, {
        propsData: { path: '/test' }
      })
      expect(wrapper.find('.active').exists()).not.toBeTruthy()
    })
  })
})
