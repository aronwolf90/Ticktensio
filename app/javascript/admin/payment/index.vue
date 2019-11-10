<template lang='pug'>
  table.h-100.w-100
    tbody
      tr
        td.text-center
          b-button(
            variant="success",
            @click="click"
          ) Add payment informations
</template>

<script>
export default {
  methods: {
    click () {
      this.$store.dispatch('createStripeCheckoutSession').then(result => {
        const stripe = Stripe('pk_test_jnjnLmEpUo9tbTIEjKKGPr62007x2iQKkM');
        stripe.redirectToCheckout({
          sessionId: result.data.data.id
        }).then(function (result) {
          alert(result)
        })
      })
    }
  }
}
</script>

<style lang='sass'>
</style>
