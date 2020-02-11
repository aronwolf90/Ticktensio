# frozen_string_literal: true

module Api
  module V1
    module BoardLists
      module Issues
        class IndexQuery < ApplicationQuery
          attr_reader :board_list_id, :more_id, :per_page

          def initialize(board_list_id:, more_id:, per_page:)
            @board_list_id = board_list_id
            @more_id = more_id
            @per_page = per_page
          end

          def call
            MoreCollectionQuery.call(
              BoardList.find(board_list_id).issues,
              more_id: more_id,
              per_page: per_page,
              sort_key: :ordinal_number
            )
          end
        end
      end
    end
  end
end
