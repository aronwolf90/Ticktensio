# frozen_string_literal: true

module Api::V1
  module Issues
    class MoveForm < ApiForm
      params do
        required(:issue_id).filled
        required(:before_issue_id).maybe(:any)
        required(:board_list_id).filled
      end
    end
  end
end
