# frozen_string_literal: true

module Api::V1
  module ProjectBoardLists
    class CreateForm < ApiForm
      params do
        required(:data).schema do
          required(:attributes).schema do
            required(:name).filled(:string)
          end
          required(:relationships).schema do
            required(:'project-status').schema(RequiredBelongsToSchema)
          end
        end
      end
    end
  end
end
