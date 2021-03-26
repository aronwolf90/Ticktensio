<template lang='pug'>
  right-aside-select(
    id='assigen',
    :label='"Assignment"',
    :options='options',
    :item='item',
    @select="onSelect"
  )
</template>

<script>
import Select from 'components/right-aside/select'

export default {
  props: ['issueId'],
  data () {
    return {
      searchText: ''
    }
  },
  created () {
    this.$store.dispatch('initUsers')
  },
  computed: {
    options () {
      return this.$store.getters.users.map(user => {
        return {
          value: { id: user.id, type: user.type },
          text: user.attributes.firstname
        }
      })
    },
    issue () {
      return this.$store.getters.entry({
        type: 'issues',
        id: this.issueId
      })
    },
    user () {
      return this.$store.getters.associatedEntry({
        entry: this.issue,
        name: 'user'
      })
    },
    item: {
      get () {
        if (!this.user) return
        return {
          value: { id: this.user.id, type: this.user.type },
          text: this.user.attributes.firstname
        }
      }
    }
  },
  methods: {
    onSelect (item) {
      this.$store.dispatch('changeIssueToUserReference', {
        issue: this.issue,
        user: this.$store.getters.entry({
          id: item.value.id,
          type: item.value.type
        })
      })
    }
  },
  components: {
    'right-aside-select': Select
  }
}
</script>
