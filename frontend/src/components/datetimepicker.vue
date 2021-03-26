<template lang='pug'>
  date-picker(
    v-on='$listeners',
    :value='value',
    :config='options',
    autocomplete="off"
  )
</template>

<script>
import datePicker from 'vue-bootstrap-datetimepicker'

export default {
  props: ['value'],
  data () {
    return {
      options: {
        format: 'DD-MM-YYYY HH:mm',
        useCurrent: false
      }
    }
  },
  components: {
    datePicker
  }
}
</script>
