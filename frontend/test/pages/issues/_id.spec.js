import Issue from 'pages/issues/_id'

describe('pages/issues/_id.vue', () => {
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
        RightAside: { template: '<div>Stubbed RightAside</div>' },
        Comments: { template: '<div>Stubbed Comments</div>' },
        CreatedBy: true
      }
    })
  }

  beforeEach(() => {
    entry.mockReturnValue(issue)
  })

  it('has comments', () => {
    const wrapper = factory()
    expect(wrapper.html()).toContain('Stubbed Comments')
  })

  it('has right asigen', () => {
    const wrapper = factory()
    expect(wrapper.html()).toContain('Stubbed RightAside')
  })
})
