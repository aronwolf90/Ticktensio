# frozen_string_literal: true

module Api::V1
  module Comments
    class CreateForm < ApiForm
      params do
        required(:data).schema do
          required(:attributes).schema do
            required(:content).filled(:string)
          end
          required(:relationships).schema do
            required(:user).filled.schema(RequiredBelongsToSchema)
            required(:issue).filled.schema(RequiredBelongsToSchema)
          end
        end
      end
    end
  end
end
