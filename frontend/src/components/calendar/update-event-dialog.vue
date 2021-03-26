<template lang='pug'>
  b-modal#update-event-dialog(
    centered="",
    title="Edit event"
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
              input(v-model='form.nonAllDay', type='checkbox')
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
      button.btn.btn-danger(
        @click='destroy',
        data-dismiss='modal'
      ) Delete
      btn-submit(
        @click="update",
        :saving="saving"
      ) Save changes
</template>

<script>
import { Utils } from 'vuex-jsonapi-client'

export default {
  props: ['eventId'],
  data () {
    return {
      saving: false,
      form: {
        title: null,
        date: null,
        startTime: null,
        endTime: null,
        nonAllDay: null,
        description: null
      }
    }
  },
  methods: {
    update () {
      this.saving = true
      this.$store.dispatch('updateEvent', {
        entry: this.event,
        attributes: {
          title: this.form.title,
          'start-time': `${this.form.date} ${this.form.startTime}`,
          'end-time': this.form.endTime ? `${this.form.date} ${this.form.endTime}` : null,
          'all-day': !this.form.nonAllDay,
          'description': this.form.description
        }
      }).then(() => {
        this.saving = false
        this.$root.$emit('bv::hide::modal', 'update-event-dialog')
      })
    },
    destroy () {
      this.$store.dispatch('destroyEvent', this.event)
      this.$root.$emit('bv::hide::modal', 'update-event-dialog')
    },
    jqueryFuncs () {
      // eslint-disable-next-line no-undef
      setTimeout(() => jqueryFuncs(), 100)
    }
  },
  computed: {
    event () {
      return this.$store.getters.entry({
        type: 'events',
        id: this.eventId
      })
    },
    date () {
      let date = Utils.attribute(this.event, 'start-time')
      return date.substring(0, 10)
    },
    startTime () {
      let date = Utils.attribute(this.event, 'start-time')
      return date.substring(11, 16)
    },
    endTime () {
      let date = Utils.attribute(this.event, 'end-time')
      if (!date) return ''
      return date.substring(11, 16)
    }
  },
  watch: {
    event () {
      if (this.loadedId === this.eventId) return
      this.loadedId = this.eventId
      this.form.title =
        Utils.attribute(this.event, 'title')
      this.form.nonAllDay =
        !Utils.attribute(this.event, 'all-day')
      this.form.description =
        Utils.attribute(this.event, 'description')
      this.$set(this.form, 'date', this.date)
      this.form.startTime = this.startTime
      this.form.endTime = this.endTime

      this.jqueryFuncs()
    }
  }
}
</script>

<style lang='sass' scoped>
.modal-content
  box-shadow: 0 1px 4px rgba(0, 0, 0, .3)
</style>
