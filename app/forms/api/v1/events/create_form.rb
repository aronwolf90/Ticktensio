# frozen_string_literal: true

module Api::V1
  module Events
    class CreateForm < ApiForm
      params do
        required(:data).schema do
          required(:attributes).schema do
            required(:title).filled(:string)
            required(:"start-time").filled(:string)
          end
        end
      end
    end
  end
end
