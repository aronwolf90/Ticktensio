# frozen_string_literal: true

module Api::V1
  module WikiCategories
    class UpdateForm < ApiForm
      params do
        required(:data).schema do
          optional(:attributes).schema do
            optional(:title).filled(:string)
          end
        end
      end
    end
  end
end
