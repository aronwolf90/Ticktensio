<template lang='pug'>
  b-modal#create-event-dialog(
    centered="",
    title="Create event",
    @ok="create"
  )
    .row
      .col-12.label
        | Title
        input.form-control(v-model='form.title')
    .row
      .col-6.label
        | Date
        b-form-datepicker(
          v-model='form.date',
          :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
        )
      .col-6.label
        | Time
        .input-group
          .input-group-prepend
            .input-group-text
              input(
                v-model='form.nonAllDay',
                type='checkbox'
              )
          template(v-if='form.nonAllDay')
            b-form-timepicker(
              v-model='form.startTime',
              placeholder="From",
              :hour12=`false`
            )
              template(v-slot:button-content="")
            b-form-timepicker(
              v-model='form.endTime',
              placeholder="To",
              :hour12=`false`
            )
              template(v-slot:button-content="")
          input.form-control(v-else, disabled=true)
    .row
      .col-12.label
        | Description
        textarea.form-control(v-model='form.description')
    template(v-slot:modal-footer="")
      b-button(
        variant="secondary",
        @click="$root.$emit('bv::hide::modal', 'create-event-dialog')"
      ) Cancel
      btn-submit.pull-right(
        @click="create",
        :saving="saving"
      ) Create event
</template>

<script>
export default {
  props: ['eventId'],
  data () {
    return {
      saving: false,
      form: {
        title: null,
        date: null,
        startTime: '',
        endTime: '',
        nonAllDay: null,
        description: null
      }
    }
  },
  methods: {
    create () {
      this.saving = true
      this.$store.dispatch('createEvent', {
        attributes: {
          title: this.form.title,
          'start-time': `${this.form.date} ${this.form.startTime}`,
          'end-time': this.form.endTime ? `${this.form.date} ${this.form.endTime}` : null,
          'all-day': !this.form.nonAllDay,
          'description': this.form.description
        }
      }).then(() => {
        this.saving = false
        this.$root.$emit('bv::hide::modal', 'create-event-dialog')
      })
    },
    jqueryFuncs () {
      // eslint-disable-next-line no-undef
      setTimeout(() => jqueryFuncs(), 100)
    }
  }
}
</script>

<style lang='sass' scoped>
.modal-content
  box-shadow: 0 1px 4px rgba(0, 0, 0, .3)
</style>
