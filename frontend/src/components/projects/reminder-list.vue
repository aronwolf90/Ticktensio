<template lang='pug'>
  .reminder-list
    .pull-right.b-button(v-b-modal.modal-new="")
      .fa.fa-plus
    .font-weight-bold.text-dark Reminders
    reminder-modal
    reminder(
      v-for="reminder in reminders",
      :id="reminder.id",
      :type="reminder.type",
      :project-id="projectId",
      :key="reminder.id"
    )
</template>

<script>
import Reminder from './reminder'
import ReminderModal from './reminder-modal'

export default {
  props: ['projectId'],
  components: {
    Reminder,
    ReminderModal
  },
  computed: {
    reminders () {
      return this.$store.getters['projectsShow/reminders']
    }
  }
}
</script>

<style lang='sass' scoped>
  .reminder-list
    padding-left: 17px
    padding-right: 17px
    color: grey
    border-bottom: 1px solid #e7e7e7
</style>
