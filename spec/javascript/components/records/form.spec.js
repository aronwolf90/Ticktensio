import RecordsForm from 'components/records/form'

/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-promise-reject-errors */

describe('components/records/form.vue', () => {
  const issue = {
    id: '1',
    type: 'issues'
  }
  const commit = sandbox.stub()
  const factory = () => {
    return createWrapper(RecordsForm, {
      stubs: {
        'form-input-record-select': true,
        'form-input-date-time': true
      },
      mocks: {
        $store: {
          getters: {
            'issues': [issue],
            'recordsForm/formIssueRef': { id: '1', type: 'issues' },
            'recordsForm/formStartTime': '10.10.2020 10:10',
            'recordsForm/formEndTime': '10.10.2020 10:11',
            'recordsForm/errors': []
          },
          commit
        }
      },
      propsData: {
        submitText: 'Update record'
      }
    })
  }

  it('is correctly rendered', () => {
    const wrapper = factory()

    expect(wrapper.find('#issue-input').props()).to.eql({
      id: 'issue-input',
      errorPath: 'relationships/issue',
      errors: [],
      label: 'Ticket',
      value: { id: '1', type: 'issues' }
    })
    expect(wrapper.find('#start-time-input').props()).to.eql({
      id: 'start-time-input',
      errorPath: 'attributes/start-time',
      errors: [],
      placeholder: undefined,
      required: true,
      label: 'Start time',
      value: '10.10.2020 10:10'
    })
    expect(wrapper.find('#end-time-input').props()).to.eql({
      id: 'end-time-input',
      errorPath: 'attributes/end-time',
      errors: [],
      placeholder: undefined,
      required: true,
      label: 'End time',
      value: '10.10.2020 10:11'
    })
  })

  it('calls correctly $store.commit when values change', async () => {
    const wrapper = factory()

    wrapper.find('#issue-input').vm.$emit('input', { id: '2', type: 'issues' })
    wrapper.find('#start-time-input').vm.$emit('input', '11.10.2020 10:10')
    wrapper.find('#end-time-input').vm.$emit('input', '11.11.2020 10:10')

    expect(commit).to.have.been.calledWith('recordsForm/formIssueRef',
      { id: '2', type: 'issues' })
    expect(commit).to.have.been.calledWith('recordsForm/formStartTime',
      '11.10.2020 10:10')
    expect(commit).to.have.been.calledWith('recordsForm/formEndTime',
      '11.11.2020 10:10')
  })
})
