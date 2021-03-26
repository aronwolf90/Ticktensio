<template lang='pug'>
  board-list-form(
    :errors='errors',
    v-model="form",
    :projectRefs='projectRefs',
    @submit='submit',
    v-if="boardList"
  )
    b-button(type="submit", variant="success") Update board list
    b-btn-group.pull-right
      form-btn-destroy(
        :entry-ref="boardList",
        @destroy="destroy"
      ) Destroy
      b-button(variant="secondary", to="..") Cancel
</template>

<script>
import BoardListForm from 'components/board-lists/form'
import FormBtnDestroy from 'components/form-btn-destroy'
import { Utils } from 'vuex-jsonapi-client'

export default {
  components: {
    BoardListForm,
    FormBtnDestroy
  },
  props: ['id'],
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
      projectRefs: [],
      boardListRef: null
    }
  },
  computed: {
    boardList () {
      return this.$store.getters.entry(this.boardListRef)
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    submit () {
      this.$store.dispatch(
        'updateBoardList',
        {
          entry: this.boardList,
          ...this.form
        }
      ).then(response => {
        this.$router.push('..')
      }).catch(({ status, data }) => {
        this.errors = data.errors
      })
    },
    fetch () {
      this.$store.dispatch('getContext')
      this.$store.dispatch('getBoardList', this.id).then(response => {
        this.boardListRef = Utils.entryToRef(response.data)
        this.form.attributes.name = response.data.attributes.name
        this.form.relationships.project.data =
          response.data.relationships.project.data
      })
      this.$store.dispatch('getProjects').then(response => {
        this.projectRefs = Utils.entryArrayToRef(response.data)
      })
    },
    destroy () {
      this.$store.dispatch('destroyBoardList', this.boardList).then(() => {
        this.$router.push('..')
      })
    }
  }
}
</script>
