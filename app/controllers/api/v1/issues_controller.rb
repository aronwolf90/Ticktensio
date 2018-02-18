# frozen_string_literal: true

module Api
  module V1
    class IssuesController < ApiController
      def show
        render json: issue, include: :comments
      end

      def update
        form = IssueForm.new(issue, params: issue_params)
        service = Issues::UpdateService.new(issue, params: issue_params)

        if form.valid?
          service.perform

          render json: issue
        else
          render json: form.errors
        end
      end

    private

      def issue
        @issue ||= Issue.find(params[:id])
      end
    end
  end
end
