<template lang='pug'>
  span
    left-aside-item(path="/administration/admin/context", notShowActive="true")
      .fa.fa-gears.fa-lg
      | &nbsp; &nbsp; Admin
    left-aside-item(path="/administration/admin/context")
      | General
    left-aside-item(path="/administration/admin/payments")
      | Payment
</template>

<script>
import LeftAsideItem from 'components/left-aside-item'

export default {
  components: {
    LeftAsideItem
  }
}
</script>
