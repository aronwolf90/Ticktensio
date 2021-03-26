<template lang='pug'>
  left-aside-item(path="/administration/contacts")
    .fa.fa-users.fa-lg
    | &nbsp; &nbsp; Contacts
</template>

<script>
import LeftAsideItem from 'components/left-aside-item'

export default {
  components: {
    LeftAsideItem
  }
}
</script>
