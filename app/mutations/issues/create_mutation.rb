# frozen_string_literal: true

module Issues
  class CreateMutation < StandardUpdateMutation
    def call
      ActiveRecord::Base.transaction do
        model.board_list.issues.each do |issue|
          issue.update!(ordinal_number: issue.ordinal_number+1)
        end
        model.ordinal_number = 0
        super
      end
    end
  end
end
