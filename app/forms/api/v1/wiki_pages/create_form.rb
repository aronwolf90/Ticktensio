# frozen_string_literal: true

module Api::V1
  module WikiPages
    class CreateForm < ApiForm
      params do
        required(:data).schema do
          required(:attributes).schema do
            required(:title).filled(:string)
          end
          required(:relationships).schema do
            required(:"wiki-category").schema(RequiredBelongsToSchema)
          end
        end
      end
    end
  end
end
