<template lang='pug'>
  b-button(
    variant="outline-secondary",
    @click="isGoogleIntegrated && $emit('destroy')",
    :href="isGoogleIntegrated? undefined : authorizationUrl"
  )
    b-spinner.mr-2(small="", v-if="loading")
    i.fa.fa-google.d-md-none(aria-hidden="true", v-else="")
    .d-none.d-md-inline
      template(v-if="isGoogleIntegrated") Destroy google integration
      template(v-else="") Integrate with google
</template>

<script>

export default {
  props: {
    isGoogleIntegrated: Boolean,
    authorizationUrl: String,
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>
