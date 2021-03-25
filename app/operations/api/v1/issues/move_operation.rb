# frozen_string_literal: true

module Api::V1
  module Issues
    class MoveOperation < ApiOperation
      step :validate
      pass :set_issue
      pass :set_board_list
      pass :set_before_issue
      step :policy
      pass :mutate

      def validate(ctx, params)
        ctx[:form] = Api::V1::Issues::MoveForm.call(params)

        ctx[:form].success?
      end

      def set_issue(ctx, issue_id:, **)
        ctx[:issue] = Issue.find(issue_id)
      end

      def set_before_issue(ctx, before_issue_id:, **)
        ctx[:before_issue] = Issue.find_by(id: before_issue_id)
      end

      def set_board_list(ctx, board_list_id:, **)
        ctx[:board_list] = BoardList.find(board_list_id)
      end

      def policy(ctx, current_user:, issue:, **)
        ctx[:policy] = IssuePolicy.new(current_user, issue).move?
      end

      def mutate(ctx, issue:, board_list:, before_issue:, **)
        ::Issues::MoveMutation.call(
          issue: issue,
          before_issue: before_issue,
          board_list: board_list
        )
      end
    end
  end
end
