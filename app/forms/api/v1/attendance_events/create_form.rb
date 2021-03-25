# frozen_string_literal: true

module Api::V1
  module AttendanceEvents
    class CreateForm < ApiForm
      params do
        required(:data).schema do
          required(:attributes).schema do
            required(:"from-day").filled(:string)
            optional(:"to-day").maybe(:string)
            optional(:"from-time").maybe(:string)
            optional(:"to-time").maybe(:string)
            optional(:description).maybe(:string)
          end
          required(:relationships).schema do
            required(:user).schema(RequiredBelongsToSchema)
          end
        end
      end
    end
  end
end
