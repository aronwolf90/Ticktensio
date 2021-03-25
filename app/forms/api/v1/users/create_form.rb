# frozen_string_literal: true

module Api::V1
  module Users
    class CreateForm < ApiForm
      params do
        required(:data).schema do
          required(:attributes).schema do
            required(:firstname).filled(:string)
            required(:lastname).filled(:string)
            required(:email).filled(:string)
            required(:type).filled(:string)
          end
        end
      end
    end
  end
end
