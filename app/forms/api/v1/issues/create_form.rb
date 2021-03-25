# frozen_string_literal: true

module Api::V1
  module Issues
    class CreateForm < ApiForm
      params do
        required(:data).schema do
          optional(:attributes).schema do
            optional(:title).filled(:string)
          end
          optional(:relationships).schema do
            required(:project).schema(RequiredBelongsToSchema)
            optional(:"board-list").schema(RequiredBelongsToSchema)
          end
        end
      end
    end
  end
end
