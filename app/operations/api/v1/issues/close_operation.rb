# frozen_string_literal: true

module Api::V1
  module Issues
    class CloseOperation < ApiOperation
      pass :model
      pass :main_operation

    private
      def model(options, params:, **)
        options[:model] = Issue.find(params[:issue_id])
      end

      def main_operation(options, model:, **)
        ::Issues::CloseOperation.call(model: model)
      end
    end
  end
end
