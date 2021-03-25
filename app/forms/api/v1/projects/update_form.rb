# frozen_string_literal: true

module Api::V1
  module Projects
    class UpdateForm < ApiForm
      params do
        required(:data).schema do
          optional(:attributes).schema do
            optional(:name).filled(:string)
          end
        end
      end
    end
  end
end
