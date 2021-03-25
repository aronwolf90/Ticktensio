# frozen_string_literal: true

module Api::V1
  module ProjectStatuses
    class UpdateForm < ApiForm
      params do
        required(:data).schema do
          required(:attributes).schema do
            optional(:name).filled(:string)
          end
        end
      end
    end
  end
end
