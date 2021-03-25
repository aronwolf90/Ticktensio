# frozen_string_literal: true

module Api::V1
  module WikiCategories
    class CreateForm < ApiForm
      params do
        required(:data).schema do
          required(:attributes).schema do
            required(:title).filled(:string)
          end
        end
      end
    end
  end
end
