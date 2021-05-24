<template lang='pug'>
  right-aside-item.labels
    template(v-slot:header="")
      .pull-right.b-button.header(v-b-modal.modal-label-new="")
        .fa.fa-plus
      a.title.pointer.font-weight-bold(@click="$bvModal.show('modal-label-index')")
        | Labels
    template(v-slot:content="")
      v-select.select(
        id="labels",
        multiple="",
        v-model="selected",
        :options="options",
        :getOptionLabel="getLabel",
        placeholder="Select labels"
      )
        <template #selected-option-container="{ option, deselect, multiple, disabled }">
          .vs__selected.text-white(
            v-bind:style="{ 'background-color': getColor(option) }"
          )
            .font-weight-bold {{ getLabel(option) }}&nbsp;
            button.vs__deselect
              .fa.fa-times.text-white(@click="deselect(option)")
        </template>
      label-modal(
        id="modal-label-new",
        title="New label"
      )
      label-modal-index
</template>

<script>
import { Utils } from 'vuex-jsonapi-client'
import LabelModal from 'components/label-modal'
import LabelModalIndex from 'components/label-modal-index'
import VSelect from 'vue-select'
import RightAsideItem from 'components/right-aside/item'

export default {
  props: ['issueRef'],
  components: {
    LabelModal,
    LabelModalIndex,
    VSelect,
    RightAsideItem
  },
  data () {
    return {
      searchText: ''
    }
  },
  computed: {
    options () {
      return Utils.entryArrayToRef(
        this.$store.getters.collection('labels') || [])
    },
    issue () {
      return this.$store.getters.entry(this.issueRef)
    },
    selected: {
      set (labelRefs) {
        this.$store.dispatch('update', {
          entry: this.issue,
          payload: {
            relationships: {
              labels: {
                data: labelRefs
              }
            }
          }
        })
      },
      get () {
        return Utils.relationship(this.issue, 'labels')
      }
    }
  },
  methods: {
    getLabel (labelRef) {
      return Utils.attribute(
        this.$store.getters.entry(labelRef),
        'name'
      )
    },
    getColor (labelRef) {
      return Utils.attribute(
        this.$store.getters.entry(labelRef),
        'color'
      )
    }
  }
}
</script>

<style lang='sass' scoped>
.select
  margin-left: -5px
.header
  margin-right: 5px
a.title
  color: grey !important
.fa.fa-plus
  color: grey !important
.pointer
  cursor: pointer
</style>

<style lang='sass'>
.labels
  .vs__dropdown-toggle
    border: none !important
  input::placeholder
    color: rgba(191, 191, 191, 0.87) !important
</style>
