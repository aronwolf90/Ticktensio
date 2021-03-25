# frozen_string_literal: true

module Api::V1
  module Events
    class UpdateForm < ApiForm
      params do
        required(:data).schema do
          required(:attributes).schema do
            optional(:title).filled(:string)
            optional(:"start-time").filled(:string)
          end
        end
      end
    end
  end
end
