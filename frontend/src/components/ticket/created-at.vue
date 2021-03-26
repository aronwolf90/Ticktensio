<template lang='pug'>
  right-aside-item.created-by(
    v-if="issue",
    label="Created at",
    :text="createdAt"
  )
</template>

<script>
import { Utils } from 'vuex-jsonapi-client'
import RightAsideItem from 'components/right-aside-item'

export default {
  props: {
    issueRef: Object
  },
  components: {
    RightAsideItem
  },
  computed: {
    issue () {
      return this.$store.getters.entry(this.issueRef)
    },
    createdAt () {
      return Utils.attribute(this.issue, 'created-at')
    }
  }
}
</script>

<style lang='sass' scoped>
.created-by
  margin-left: 18px
.divider
  margin-left: -18px
  margin-top: 0
  margin-bottom: 0
label
  margin-top: 8px
  margin-bottom: 0
  color: grey
.information
  margin-top: 4px
  color: grey
</style>
