# frozen_string_literal: true

module Issues
  class MoveMutation < ApplicationMutation
    attr_reader :issue, :before_issue, :board_list, :ordinal_number, :project

    def initialize(
      issue:,
      before_issue: nil,
      ordinal_number: nil,
      board_list:,
      project: nil
    )
      @issue = issue
      @before_issue = before_issue
      @board_list = board_list
      @ordinal_number = ordinal_number
      @project = project
    end

    def call
      ActiveRecord::Base.transaction do
        issue.update!(global_board_list: global_board_list) if global_board_list.present?
        issue.update!(board_list: project_board_list) if project_board_list.present?
      end

      if before_issue.blank? || before_issue.board_list == issue.board_list
        issue.update!(ordinal_number: project_ordinal_number)
        SortMutation.call(
          Issue.where(board_list_id: issue.board_list_id),
          model: issue,
          sort_key: :ordinal_number,
          sort_value: project_ordinal_number
        )
      end

      if before_issue.blank? || before_issue.global_board_list == issue.global_board_list
        issue.update!(global_ordinal_number: global_ordinal_number)
        SortMutation.call(
          Issue.where(global_board_list_id: issue.global_board_list_id),
          model: issue,
          sort_key: :global_ordinal_number,
          sort_value: global_ordinal_number
        )
      end
    end

    private def project_ordinal_number
      if before_issue.blank? && board_list&.project.present? && ordinal_number.present?
        return ordinal_number
      elsif before_issue.blank?
        return 0
      end

      Issue
        .where("ordinal_number < :ordinal_number "\
               "OR (ordinal_number=:ordinal_number AND created_at>:created_at) "\
               "OR (ordinal_number=:ordinal_number AND created_at=:created_at AND id>:id)",
               ordinal_number: before_issue.ordinal_number,
               created_at: before_issue.created_at,
               id: before_issue.id)
        .where(board_list: before_issue.board_list)
        .count + 1
    end

    private def global_ordinal_number
      if before_issue.blank? && board_list&.project.blank? && ordinal_number.present?
        return ordinal_number
      elsif before_issue.blank?
        return 0
      end

      Issue
        .where("global_ordinal_number < :global_ordinal_number "\
               "OR (global_ordinal_number=:global_ordinal_number AND created_at>:created_at) "\
               "OR (global_ordinal_number=:global_ordinal_number AND created_at=:created_at AND id>:id)",
               global_ordinal_number: before_issue.global_ordinal_number,
               created_at: before_issue.created_at,
               id: before_issue.id)
        .where(global_board_list: before_issue.global_board_list)
        .count + 1
    end

    private def project_board_list
      if board_list.present?
        return board_list if board_list&.project.present?

        BoardList.project.where(kind: board_list.kind, name: board_list.name).first ||
          BoardList.project.where(kind: board_list.kind).first ||
          BoardList.project.where(name: board_list.name).first
      else
        project&.board_lists&.where(kind: issue.board_list&.kind, name: issue.board_list&.name)&.first ||
          project&.board_lists&.where(kind: issue.board_list&.kind)&.first ||
          project&.board_lists&.project&.where(name: issue.board_list&.name)&.first ||
          project&.board_lists&.first
      end
    end

    private def global_board_list
      return board_list if board_list&.project.blank?

      BoardList.global.where(kind: board_list.kind, name: board_list.name).first ||
        BoardList.global.where(kind: board_list.kind).first ||
        BoardList.global.where(name: board_list.name).first
    end
  end
end
