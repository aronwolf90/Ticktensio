<template lang='pug'>
b-nav-item-dropdown(
  id="bell-dropdown",
  class="bg-transparent",
  @show="notificationsReaded",
  toggle-class="notification-bell" size="sm" menu-class="bell-menu" right
)
  <template v-slot:button-content>
      i.fa.fa-bell
      b-badge.bell-badge(
        pill="",
        variant="danger",
        v-if="unreadCount || unreadCount != 0"
      ) {{ unreadCount }}
  </template>
  b-card.bell-item.accordion(no-body="", v-if="notifications == null")
    b-card-header.text-center
      .fa.fa-spinner.fa-spin.text-dark
  b-card.bell-item.accordion(no-body="", v-else-if="notifications.length == 0")
    b-card-header.text-center There are no notifications yet
  b-card.bell-item.accordion(no-body="", v-else="")
    div(v-for="notification in notifications", :key="notification.id")
      b-card-header(
        :aria-controls="`notification-${notification.id}`",
        data-toggle="collapse",
        :data-target="`#notification-${notification.id}`",
        class="bell-item-header"
      ) {{ notification.attributes.subject }}
      .collapse(
        :id="`notification-${notification.id}`",
        accordion="notifications",
        aria-expanded="true",
        role="tabpanel",
        class="text-muted bell-collapse",
        data-parent=".accordion"
      )
        b-card-body {{ notification.attributes.body }}
    b-card-footer.text-center(@click="loadMore", v-if="loadMorePath") more
</template>

<script>
import { Utils } from 'vuex-jsonapi-client'

export default {
  data () {
    return {
      notifications: null,
      loadMorePath: null,
      unreadCount: 0
    }
  },
  created () {
    this.load()
  },
  methods: {
    load () {
      this.$store.dispatch('getNotifications').then(response => {
        this.notifications = response.data
        this.loadMorePath = response.links.next
        this.unreadCount = response.meta['unread-count']
      })
    },
    loadMore () {
      this.$store
        .dispatch('loadMoreNotifications', this.loadMorePath)
        .then(response => {
          response.data.forEach(notification => {
            let notificationAdded = this.notifications.some(localNotification => {
              return Utils.sameRef(localNotification, notification)
            })
            if (!notificationAdded) this.notifications.push(notification)
            this.loadMorePath = response.links.next
          })
        })
    },
    notificationsReaded () {
      if (!this.notifications || !this.notifications[0]) return
      this.$store
        .dispatch('notificationsReaded', { readedAt: this.notifications[0].attributes['created_at'] })
        .then(() => {
          this.unreadCount = 0
        })
    }
  }
}
</script>

<style lang='sass'>
.notification-bell
  padding-top: 2px !important
  padding-bottom: 2px !important
  padding-right: 20px !important
  max-width: 200px !important
.bell-menu
  padding-top: 0 !important
  padding-bottom: 0 !important
  width: 400px
  max-height: 550px
  overflow-y: auto
  border-radius: 10px !important
  .bell-item
    border-radius: 10px
  .bell-item-header
    white-space: nowrap
    cursor: pointer
.bell-badge
  transform: translateX(-7px) translateY(-9px)
</style>
