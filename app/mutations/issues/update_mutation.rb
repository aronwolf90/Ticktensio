# frozen_string_literal: true

module Issues
  class UpdateMutation < StandardUpdateMutation
    attr_reader :ordinal_number

    def call
      ActiveRecord::Base.transaction do
        project_id = attributes.delete(:project_id)
        ordinal_number = attributes.delete(:ordinal_number)
        board_list_id = attributes.delete(:board_list_id)

        super

        if project_id.present? || board_list_id.present? || ordinal_number.present?
          Issues::MoveMutation.call(
            issue: model,
            board_list: BoardList.find_by(id: board_list_id),
            ordinal_number: ordinal_number,
            project: Project.find_by(id: project_id)
          )
        end
      end
    end
  end
end
