# frozen_string_literal: true

module Api::V1
  module ProjectBoardLists
    class UpdateForm < ApiForm
      params do
        optional(:data).schema do
          optional(:attributes).schema do
            optional(:name).filled(:string)
            optional(:'ordinal-number').filled(:any)
          end
        end
      end
    end
  end
end
