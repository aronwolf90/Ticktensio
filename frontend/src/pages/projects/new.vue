<template lang='pug'>
  project-form(
    :errors='errors',
    @submit='submit',
    v-model="form",
    :contactRefs='contactRefs'
  )
</template>

<script>
import ProjectForm from 'components/projects/form'
import { Utils } from 'vuex-jsonapi-client'

export default {
  components: {
    ProjectForm
  },
  data () {
    return {
      form: {
        currentTab: 0,
        attributes: {
          name: null,
          description: null
        },
        relationships: {
          'project-status': {
            data: null
          },
          existingContact: {
            data: null
          },
          newContact: {
            data: {
              attributes: {
                name: null,
                description: null,
                telephone: null,
                email: null
              }
            }
          }
        }
      },
      errors: [],
      contactRefs: []
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    submit (form) {
      const payload = {
        attributes: this.form.attributes,
        relationships: {
          'project-status': this.form.relationships['project-status']
        }
      }

      if (this.form.currentTab === 1) {
        payload.relationships.contact = {
          data: {
            attributes: this.form.relationships.newContact.data.attributes
          }
        }
      } else if (this.form.currentTab === 2) {
        payload.relationships.contact = {
          data: Utils.entryToRef(this.form.relationships.existingContact.data)
        }
      }

      this.$store.dispatch('createProject', payload).then(response => {
        if (this.form.relationships['project-status'].data) {
          this.$router.push(`/administration/project_statuses/${this.form.relationships['project-status'].data.id}`)
        } else {
          this.$router.push('/administration/projects')
        }
      }).catch(({ status, data }) => {
        this.errors = data.errors
      })
    },
    fetch () {
      this.$store.dispatch('getContacts').then(response => {
        this.contactRefs = Utils.entryArrayToRef(response.data)
      })
    }
  }
}
</script>
