<template lang='pug'>
  div(v-html="html")
</template>

<script>
import store from 'store'

export default {
  data () {
    return {
      html: '<span></span>'
    }
  },
  created () {
    setTimeout(() => {
      // eslint-disable-next-line no-undef
      jqueryFuncs()
    }, 100)
  },
  beforeRouteEnter (to, from, next) {
    store.getters.axios.get(
      to.meta.path,
      { headers: { LAYOUT: false } }
    ).then(response => {
      next(vm => {
        vm.html = response.data
      })
    })
  }
}
</script>
