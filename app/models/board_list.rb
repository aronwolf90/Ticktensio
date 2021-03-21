# frozen_string_literal: true

class BoardList < ApplicationRecord
  acts_as_paranoid

  has_many :issues
  has_many :global_issues, foreign_key: :global_board_list, class_name: "Issue"

  belongs_to :project

  scope :ordered, -> { order(:ordinal_number, :id) }
  scope :project, -> { where.not(project_id: nil) }
  scope :global, -> { where(project_id: nil) }

  enum kind: {
    open: "open",
    other: "other",
    closed: "closed"
  }

  def issues
    @issues ||=
      if project_id.nil?
        global_issues
          .order(:global_ordinal_number, created_at: :desc, id: :desc)
      else
        super
          .where(board_list_id: id)
          .order(:ordinal_number, created_at: :desc, id: :desc)
      end
  end

  def complexity
    @complexity ||=
      if project_id.nil?
        Issue.where(global_board_list_id: id).sum(:complexity)
      else
        Issue.where(board_list_id: id).sum(:complexity)
      end
  end
end
