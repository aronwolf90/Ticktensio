<template lang='pug'>
  b-modal(
    id="modal-new",
    title="New reminder (Ticket)",
    size="xl",
    v-model="show",
    @show="reset"
  )
    b-form(@submit.prevent="submit")
      b-form-group(
        id="input-group-title",
        label="Title",
        label-for="input-title"
      )
        b-form-input(
          id="input-title",
          v-model="form.attributes.title",
          :state="errorStatus('attributes/title')",
          type="text"
        )
        b-form-invalid-feedback(
          v-for="(error, index) in findErrors('attributes/title')",
          :state="errorStatus('attributes/title')",
          :key="index"
        )
          | {{ error.detail }}
      b-form-group(
        id="input-group-due-at",
        label="Due at",
        label-for="input-due-at"
      )
        datetimepicker(
          id="input-due-at",
          v-model="form.attributes['due-at']"
        )
      b-form-group(
        id="input-group-deadline-at",
        label="Deadline at",
        label-for="input-deadline-at"
      )
        datetimepicker(
          id="input-deadline-at",
          v-model="form.attributes['deadline-at']"
        )
      markdown-editor(v-model='form.attributes.description')
      br
    template(v-slot:modal-footer="")
      b-button(
        variant="secondary",
        @click="show=false"
      ) Cancel
      btn-submit.pull-right(
        @click="submit",
        :saving="saving"
      ) Create reminder
</template>

<script>
import MarkdownEditor from 'markdown_editor'
import Datetimepicker from 'components/datetimepicker'
import BtnSubmit from 'components/btn-submit'

export default {
  components: {
    MarkdownEditor,
    Datetimepicker,
    BtnSubmit
  },
  props: ['boardListId'],
  data () {
    return {
      show: false,
      saving: false,
      form: {
        attributes: {
          title: null,
          description: null,
          'due-at': null,
          'deadline-at': null
        }
      },
      errors: []
    }
  },
  methods: {
    fetch () {
      this.$store.dispatch('getBoardList', this.boardListId)
      this.$store.dispatch('getSelectedProject')
    },
    reset () {
      this.saving = false
      this.form.attributes.title = null
      this.form.attributes.description = null
      this.form.attributes['description'] = null
      this.form.attributes['due-at'] = null
      this.form.attributes['deadline-at'] = null
      this.errors = []
    },
    submit () {
      this.saving = true
      const payload = {
        attributes: this.form.attributes,
        relationships: {
          'project': {
            data: this.$store.getters['projectsShow/project']
          }
        }
      }

      this.$store.dispatch('createIssue', payload).then(response => {
        this.$store.commit('projectsShow/addReminder', response.data.data)
        this.saving = false
        this.show = false
      }).catch(({ status, data }) => {
        this.errors = data.errors
        this.saving = false
      })
    },
    errorStatus (pointer) {
      let errors = this.findErrors(pointer)
      return errors.length === 0 ? null : false
    },
    findErrors (pointer) {
      return this.errors.filter(error => {
        return error.source.pointer.includes(pointer)
      })
        .filter((error, index, self) => {
          return self.findIndex(value => value.detail === error.detail) === index
        })
    }
  }
}
</script>
