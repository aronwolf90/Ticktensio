# frozen_string_literal: true

module Api
  module V1
    class NotificationsController < ApiController
      include StandartActions
      per_page 10
      serializer Api::V1::NotificationSerializer
      collection_query Api::V1::Notifications::IndexQuery

      def index
        render(
          json: collection_result.collection,
          links: { next: next_more_path },
          meta: { unreadCount: collection_result.unread_count },
          each_serializer: serializer
        )
      end

      private
        def collection_result
          @collection ||= collection_query.call(
            more_id: params[:more_id],
            per_page: per_page
          )
        end

        def next_more_path
          return unless collection_result.has_more

          api_v1_notifications_path(more_id: next_more_id)
        end
    end
  end
end
