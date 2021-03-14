import Issue from 'pages/issues/_id'

/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */

describe('Issue', () => {
  const entry = sandbox.stub()
  const dispatch = sandbox.stub()
  const issue = {
    id: 1,
    type: 'issues',
    attributes: {
      title: 'issue title',
      description: 'description'
    }
  }
  const factory = () => {
    return createWrapper(Issue, {
      propsData: { id: 1 },
      mocks: {
        $store: {
          getters: {
            entry
          },
          dispatch
        }
      },
      stubs: {
        RightAside: '<div>Stubbed RightAside</div>',
        Comments: '<div>Stubbed Comments</div>',
        CreatedBy: true
      }
    })
  }

  beforeEach(() => {
    entry.returns(issue)
  })

  it('has comments', () => {
    const wrapper = factory()
    expect(wrapper.html()).to.include('Stubbed Comments')
  })

  it('has right asigen', () => {
    const wrapper = factory()
    expect(wrapper.html()).to.include('Stubbed RightAside')
  })
})
