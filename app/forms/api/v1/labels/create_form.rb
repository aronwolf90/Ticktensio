# frozen_string_literal: true

module Api::V1
  module Labels
    class CreateForm < ApiForm
      params do
        required(:data).schema do
          required(:attributes).schema do
            required(:name).filled(:string)
            required(:color).filled(:string)
          end
        end
      end
    end
  end
end
