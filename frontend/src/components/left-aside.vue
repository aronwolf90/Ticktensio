<template lang='pug'>
  left-aside-container.projects-left-aside
    left-aside-item(path="/administration")
      | Dashboard
    left-aside-item(path="/administration/records")
      | Records
    left-aside-item(path="/administration/calendar")
      | Calendar
    left-aside-item(path="/administration/attendances")
      | Attendances
    left-aside-item(path="/administration/board_lists")
      | Tickets
</template>

<script>
import LeftAsideContainer from 'components/left-aside-container'
import LeftAsideItem from 'components/left-aside-item'

export default {
  components: {
    LeftAsideContainer,
    LeftAsideItem
  }
}
</script>
