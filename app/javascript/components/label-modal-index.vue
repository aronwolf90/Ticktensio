<template lang='pug'>
  b-modal(
    id="modal-label-index",
    title="Labels",
    size="xl",
    v-model="show",
    @show="reset",
    hide-footer="",
  )
    ul.list-group.list-group-flush
      li.list-group-item(v-for="label in labels")
        b-badge(
          v-bind:style="{ 'background-color': label.attributes.color }"
        ) {{ label.attributes.name }}
        b-button.pull-right(
          @click="$bvModal.show(`label-${label.id}-edit`)",
          size="sm"
        )
          .fa.fa-edit
        label-modal(
          :title="label.attributes.name",
          :id="`label-${label.id}-edit`",
          :edit="true",
          :label-ref="label"
        )
</template>

<script>
import TextInput from 'components/form-inputs/text'
import ColorInput from 'components/form-inputs/color'
import FormMixin from 'mixins/form'
import { Utils } from 'vuex-jsonapi-client'
import LabelModal from './label-modal'

export default {
  components: {
    TextInput,
    ColorInput,
    FormMixin,
    LabelModal
  },
  props: ['labelRef', 'edit'],
  mixins: [FormMixin],
  data () {
    return {
      show: false,
      saving: false,
      form: {
        attributes: {
          name: null,
          color: 'black'
        }
      },
      errors: []
    }
  },
  computed: {
    labels () {
      return this.$store.getters.collection('labels')
    }
  },
  methods: {
    reset () {
      this.saving = false
      this.form.attributes.name = Utils.attribute(this.label, 'name')
      this.form.attributes.color = Utils.attribute(this.label, 'color') || 'black'
      this.errors = []
    },
    submit () {
      this.saving = true
      const payload = {
        attributes: this.form.attributes
      }

      this.createOrUpdate(payload).then(response => {
        this.saving = false
        this.show = false
      }).catch(({ status, data }) => {
        this.errors = data.errors
        this.saving = false
      })
    },
    createOrUpdate (payload) {
      if (this.edit) {
        return this.$store.dispatch('update', {
          entry: this.label,
          payload
        })
      } else {
        return this.$store.dispatch('createLabel', payload)
      }
    }
  }
}
</script>
