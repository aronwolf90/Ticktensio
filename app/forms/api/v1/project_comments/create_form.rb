# frozen_string_literal: true

module Api::V1
  module ProjectComments
    class CreateForm < ApiForm
      params do
        required(:data).schema do
          required(:attributes).schema do
            required(:content).filled(:string)
          end
          required(:relationships).schema do
            required(:user).filled.schema(RequiredBelongsToSchema)
            required(:project).filled.schema(RequiredBelongsToSchema)
          end
        end
      end
    end
  end
end
