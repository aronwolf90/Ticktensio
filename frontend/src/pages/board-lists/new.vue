<template lang='pug'>
  board-list-form(
    :errors='errors',
    v-model="form",
    :projectRefs='projectRefs',
    @submit='submit'
  )
    b-button(type="submit", variant="success") Create board list
    b-button.pull-right(variant="secondary", to=".") Cancel
</template>

<script>
import BoardListForm from 'components/board-lists/form'
import { Utils } from 'vuex-jsonapi-client'

export default {
  components: {
    BoardListForm
  },
  data () {
    return {
      form: {
        attributes: {
          name: null
        },
        relationships: {
          project: {
            data: null
          }
        }
      },
      errors: [],
      projectRefs: []
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    submit () {
      this.$store.dispatch(
        'createBoardList',
        this.form
      ).then(response => {
        this.$router.push('.')
      }).catch(({ status, data }) => {
        this.errors = data.errors
      })
    },
    fetch () {
      this.$store.dispatch('getCurrentUser').then(response => {
        if (Utils.attribute(this.$store.getters.context, 'global-board')) {
          return
        }
        this.form.relationships.project.data =
          Utils.relationship(response, 'selected-project')
      })
      this.$store.dispatch('getProjects').then(response => {
        this.projectRefs = Utils.entryArrayToRef(response.data)
      })
    }
  }
}
</script>
