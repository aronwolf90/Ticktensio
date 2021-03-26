<template lang='pug'>
  span
    left-aside-item(path="/administration/users")
      i.fa.fa-users.fa-lg
      | &nbsp; &nbsp; Users
</template>

<script>
import LeftAsideItem from 'components/left-aside-item'

export default {
  components: {
    LeftAsideItem
  }
}
</script>
