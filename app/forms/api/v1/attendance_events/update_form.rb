# frozen_string_literal: true

module Api::V1
  module AttendanceEvents
    class UpdateForm < ApiForm
      params do
        required(:data).schema do
          optional(:attributes).schema do
            optional(:"from-day").filled(:string)
            optional(:"to-day").filled(:string)
            optional(:"from-time").filled(:string)
            optional(:"to-time").filled(:string)
            optional(:description).filled(:string)
          end
          optional(:relationships).schema do
            optional(:user).schema(RequiredBelongsToSchema)
          end
        end
      end
    end
  end
end
