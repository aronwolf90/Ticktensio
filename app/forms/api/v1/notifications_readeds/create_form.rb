# frozen_string_literal: true

module Api::V1
  module NotificationsReadeds
    class CreateForm < ApiForm
      params do
        optional(:data).schema do
          optional(:attributes).schema do
            # optional(:"readed-at", Dry::Types["params.date_time"]).filled(:date_time?)
          end
        end
      end
    end
  end
end
