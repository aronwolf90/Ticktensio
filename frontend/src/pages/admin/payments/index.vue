<template lang='pug'>
  .admin-payment
    table.table(v-if="subscription")
      tbody.table-striped
        tr
          td Iban: **** **** **** {{ subscription.attributes['iban-last4'] }}
        tr
          td Cost/Month: {{ subscription.attributes.premia }}€
    template(v-if="!subscriptionResult")
      .text-center
        b-spinner(label="Spinning")
        .mb-2
    .table-responsive
      table.table
        thead
          th Created at
          th Amount paid
          th Amount due
          th Amount remaining
          th
            b-button.pull-right(
              variant="success",
              @click="click"
            ) Add payment informations
        tbody
          tr(v-if="!invoicesResult")
            td.text-center(colspan="5")
              b-spinner(label="Spinning")
          tr(v-for="invoice in invoices")
            td {{ invoice.attributes['created-at'] }}
            td {{ formatMoney(invoice.attributes['amount-paid']) }}
            td {{ formatMoney(invoice.attributes['amount-due']) }}
            td {{ formatMoney(invoice.attributes['amount-remaining']) }}
            td
              a.pull-right.btn.btn-secondary(:href="invoice.attributes.pdf")
                i.fa.fa-file-pdf-o(aria-hidden="true")
</template>

<script>
import Vue from 'vue'

export default {
  data () {
    return {
      subscriptionResult: null,
      invoicesResult: null
    }
  },
  mounted () {
    this.$store.dispatch('subscription').then(response => {
      this.subscriptionResult = response
    })
    this.$store.dispatch('invoices').then(response => {
      this.invoicesResult = response
    })
    if (Vue.loadScript) {
      Vue.loadScript('https://js.stripe.com/v3/')
    }
  },
  computed: {
    subscription () {
      if (!this.subscriptionResult) return
      return this.subscriptionResult.data
    },
    invoices () {
      if (!this.invoicesResult) return []
      return this.invoicesResult.data
    },
    context () {
      if (!this.contextResult) return
      return this.contextResult.data
    }
  },
  methods: {
    click () {
      this.$store.dispatch('createStripeCheckoutSession').then(result => {
        // eslint-disable-next-line no-undef
        const stripe = Stripe(env.STRIPE_PUBLIC_KEY)
        stripe.redirectToCheckout({
          sessionId: result.data.data.id
        }).then(function (result) {
          alert(result)
        })
      })
    },
    formatMoney (number) {
      return new Intl.NumberFormat('de-DE',
        { style: 'currency', currency: 'EUR' })
        .format(number / 100.0)
    }
  }
}
</script>

<style lang='sass'>
</style>
