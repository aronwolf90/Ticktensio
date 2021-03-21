<template lang='pug'>
  b-modal(
    :id="id",
    :title="title",
    size="xl",
    v-model="show",
    @show="reset"
  )
    b-form(@submit.prevent="submit")
      text-input(
        id="input-name",
        :errors="errors",
        v-model="form.attributes.name",
        label="Name",
        error-path="attributes/name"
      )
      color-input(
        id="input-color",
        :errors="errors",
        v-model="form.attributes.color",
        label="Color",
        error-path="attributes/name"
      )
    template(v-slot:modal-footer="")
      b-button(
        variant="secondary",
        @click="show=false",
      ) Cancel
      btn-submit.pull-right(
        @click="submit",
        :saving="saving"
      )
        template(v-if="edit") Update label
        template(v-else="") Create label
</template>

<script>
import TextInput from 'components/form-inputs/text'
import ColorInput from 'components/form-inputs/color'
import FormMixin from 'mixins/form'
import { Utils } from 'vuex-jsonapi-client'

export default {
  components: {
    TextInput,
    ColorInput,
    FormMixin
  },
  props: ['labelRef', 'edit', 'title', 'id'],
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
    label () {
      return this.$store.getters.entry(this.labelRef)
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
