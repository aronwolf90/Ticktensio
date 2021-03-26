import IssuesRecordSection from 'components/issues-record-section'

describe('components/issues-record-section.vue', () => {
  describe('clicks', () => {
    const user = { id: 1, type: 'users' }
    const issue = { id: 1, type: 'issues' }

    it('create record', async () => {
      const wrapper = createWrapper(IssuesRecordSection, {
        mocks: {
          $store: {
            getters: {
              currentUser: user
            }
          }
        }
      })
      entry.mockReturnValue(issue)
      wrapper.find('.fa-play').trigger('click')
      await wrapper.vm.$nextTick()
      expect(dispatch).toHaveBeenCalled()
    })
  })
})
