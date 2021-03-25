# frozen_string_literal: true

module Api::V1
  module Documents
    class CreateForm < ApiForm
      params do
        required(:data).schema do
          required(:attributes).schema do
            required(:name).filled(:string)
            required(:"document-file-id").filled(:string)
          end
          required(:relationships).schema do
            required(:folder).schema(RequiredBelongsToSchema)
          end
        end
      end
    end
  end
end
