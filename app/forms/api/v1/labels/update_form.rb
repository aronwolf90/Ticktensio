# frozen_string_literal: true

module Api::V1
  module Labels
    class UpdateForm < ApiForm
      params do
        required(:data).schema do
          optional(:attributes).schema do
            optional(:name).filled(:string)
            optional(:color).filled(:string)
          end
        end
      end
    end
  end
end
