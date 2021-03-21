<template lang='pug'>
  right-aside-select(
    id="complexity",
    label="Complexity",
    :options='options',
    :item='item',
    @select="onSelect"
  )
</template>

<script>
import { Utils } from 'vuex-jsonapi-client'
import Select from 'components/right-aside/select'

export default {
  props: ['issueId'],
  data () {
    return {
      searchText: '',
      options: [
        { value: '0', text: '0' },
        { value: '0.5', text: '0.5' },
        { value: '1', text: '1' },
        { value: '2', text: '2' },
        { value: '3', text: '3' },
        { value: '5', text: '5' },
        { value: '8', text: '8' },
        { value: '13', text: '13' }
      ]
    }
  },
  computed: {
    issue () {
      return this.$store.getters.entry({
        type: 'issues',
        id: this.issueId
      })
    },
    complexity () {
      return Utils.attribute(this.issue, 'complexity')
    },
    item () {
      if (!this.complexity) return
      return {
        value: this.complexity,
        text: parseFloat(this.complexity).toString()
      }
    }
  },
  methods: {
    onSelect (item) {
      this.$store.dispatch('updateIssue', {
        entry: this.issue,
        attributes: { complexity: item.value }
      })
    }
  },
  components: {
    'right-aside-select': Select
  }
}
</script>
