<template lang='pug'>
  span(v-if="id")
    left-aside-item(:path="`/administration/users/${id}`", notShowActive="true")
      i.fa.fa-user.fa-lg
      | &nbsp; &nbsp; User Settings
    left-aside-item(:path="`/administration/users/${id}`")
      | Edit
    left-aside-item(:path="`/administration/users/${id}/configuration/edit`")
      | Configuration
    left-aside-item(:path="`/administration/users/${id}/records`")
      | Records
</template>

<script>
import LeftAsideItem from 'components/left-aside-item'

export default {
  props: ['id'],
  components: {
    LeftAsideItem
  }
}
</script>
