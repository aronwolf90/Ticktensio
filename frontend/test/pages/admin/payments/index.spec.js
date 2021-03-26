import AdminPaymentsIndex from 'pages/admin/payments/index'

describe('pages/admin/payments/index.vue', () => {
  const subscription = {
    id: 'subscription',
    type: 'subscriptions',
    attributes: {
      'iban-last4': '2424',
      premia: 5
    }
  }
  const invoice = {
    id: 'invoice_id',
    type: 'invoices',
    attributes: {
      'amount-paid': 800,
      'amount-due': 800,
      'amount-remaining': 0,
      pdf: 'https://pay.stripe.com/invoice/invst_9KtFtihugeF8KkYEfFEJltHcg7/pdf'
    }
  }
  const factory = () => {
    return createWrapper(AdminPaymentsIndex)
  }

  beforeEach(() => {
    when(dispatch)
      .calledWith('subscription')
      .mockResolvedValue({ data: subscription })
      .calledWith('invoices')
      .mockResolvedValue({ data: [invoice] })
  })

  it('render iban-last4', async () => {
    const wrapper = factory()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toContain('**** **** **** 2424')
    expect(wrapper.html()).not.toContain('spinner')
  })

  it('render premia', async () => {
    const wrapper = factory()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toContain('**** **** **** 2424')
  })

  it('render payment btn', () => {
    const wrapper = factory()

    expect(wrapper.html()).toContain('Add payment informations')
  })

  it('render invoice table headers', () => {
    const wrapper = factory()

    expect(wrapper.html()).toContain('Created at')
    expect(wrapper.html()).toContain('Amount paid')
    expect(wrapper.html()).toContain('Amount due')
    expect(wrapper.html()).toContain('Amount remaining')
  })

  it('render invoice table body', async () => {
    const wrapper = factory()

    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toContain('8,00')
  })

  it('render invoice pdf link', async () => {
    const wrapper = factory()

    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toContain('https://pay.stripe.com/invoice/invst_9KtFtihugeF8KkYEfFEJltHcg7/pdf')
  })

  it('render spinner when loading subscription', async () => {
    when(dispatch).calledWith('subscription')
      .mockResolvedValue()
    const wrapper = factory()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toContain('spinner')
  })

  it('render spinner when invoices are loading', () => {
    when(dispatch)
      .calledWith('invoices')
      .mockResolvedValue()
    const wrapper = factory()

    expect(wrapper.html()).toContain('spinner')
  })
})
