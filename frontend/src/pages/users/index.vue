<template lang='pug'>
  .users-index
     index-top-section(
       resource="users",
       :item-text-function="itemTextFunction",
     )
       template(v-slot:btn-new="")
         template(v-if="showModal")
           b-button(variant='success', v-b-modal.modal-1='') New user
           b-modal(id="modal-1", :title="`You have created ${userCount} from 10 free users`", v-model="show")
             p To create more than more than 10 users, add your <a href="/administration/admin/payments">payment information</a>
             template(v-slot:modal-footer="")
               .w-100
                 b-button(
                   variant="primary",
                   class="float-left",
                   @click="show=false"
                 ) Close
                 b-button.float-right(
                   variant="success",
                   to="/administration/users/new",
                   v-if="showContinueBtn",
                 ) Continue
         template(v-else="")
           b-button(variant="success", to="/administration/users/new") New user

     br

     b-list-group(flush="")
       b-list-group-item.list-lines(v-for="user in users")
         b-link.text-dark(:to="`/administration/users/${user.id}`")
          | {{ user.attributes.firstname }} {{ user.attributes.lastname }}
         b-badge.pull-right(
           variant="warning",
           v-if="!user.attributes.active"
         ) Disabled
     br
     b-pagination-nav(
       :link-gen="linkGen",
       :number-of-pages="paginationPageCount",
       :value="paginationCurrentPage",
       use-router="",
       @page-click.prevent=""
     )
</template>

<script>
import IndexTopSection from 'components/index-top-section'
import IndexListItem from 'components/index-list-item'
import { Utils } from 'vuex-jsonapi-client'

export default {
  components: {
    IndexTopSection,
    IndexListItem
  },
  data () {
    return {
      show: false,
      userRefs: [],
      contextRef: null,
      paginationPageCount: 1,
      paginationCurrentPage: 1
    }
  },
  async beforeRouteEnter (to, from, next) {
    next(vm => vm.fetch(to.query.page))
  },
  async beforeRouteUpdate (to, from, next) {
    this.fetch(to.query.page)
    next()
  },
  computed: {
    users () {
      return this.userRefs.map(userRef => this.$store.getters.entry(userRef))
    },
    context () {
      return this.$store.getters.entry(this.contextRef)
    },
    userCount () {
      return Utils.attribute(this.context, 'user-count')
    },
    premium () {
      return Utils.attribute(this.context, 'premium')
    },
    showModal () {
      return !this.premium && this.userCount > 5
    },
    showContinueBtn () {
      return this.userCount < 10
    }
  },
  methods: {
    itemTextFunction (user) {
      return `${user.attributes.firstname} ${user.attributes.lastname}`
    },
    linkGen (page) {
      return page === 1 ? '?' : `?page=${page}`
    },
    async fetch (page) {
      const usersPromise = this.$store.dispatch('get', `users?page=${page}`)
      const contextPromise = this.$store.dispatch('getContext')
      const [usersResponse, contextResponse] = await Promise.all([usersPromise, contextPromise])

      this.userRefs = usersResponse.data
      this.paginationPageCount = Math.ceil((usersResponse.meta.count || 0) / 10)
      this.paginationCurrentPage = page || 1
      this.contextRef = contextResponse.data
    }
  }
}
</script>
