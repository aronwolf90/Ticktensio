<template lang='pug'>
.not-found
  .page-wrap.d-flex.flex-row.align-items-center
    .container
       .row.justify-content-center
         .col-md-12.text-center
           span.display-1.d-block 404
           .mb-4.lead The page you are looking for was not found.
           a.btn.btn-link(href="/") Back to Home
</template>

<script>
export default {
}
</script>

<style lang='sass' scoped>
.not-found
  background: #dedede

.page-wrap
  min-height: 100vh
</style>
