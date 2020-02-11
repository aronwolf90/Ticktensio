# frozen_string_literal: true

module Api
  module V1
    class NotificationsReadedsController < ApiController
      operation Api::V1::NotificationsReadeds::CreateOperation

      def create
        result = operation.call(
          params: params.to_unsafe_h,
          current_user: current_user
        )

        if result.success?
          head :ok
        else
          render_errors(result[:errors])
        end
      end
    end
  end
end
