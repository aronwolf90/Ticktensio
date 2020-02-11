# frozen_string_literal: true

module Api
  module V1
    module Notifications
      class IndexQuery < ApplicationQuery
        attr_reader :more_id, :per_page

        class Result < MoreCollectionQuery::Result
          attr_reader :unread_count

          def initialize(unread_count:, **args)
            @unread_count = unread_count
            super(**args)
          end
        end

        def initialize(more_id:, per_page:)
          @more_id = more_id
          @per_page = per_page
        end

        def call
          result = MoreCollectionQuery.call(
            Notification.all,
            more_id: more_id,
            per_page: per_page
          )

          Result.new(
            collection: result.collection,
            has_more: result.has_more,
            unread_count: Notification.where(readed: false).count
          )
        end
      end
    end
  end
end
