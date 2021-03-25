# frozen_string_literal: true

module Api::V1
  module Documents
    class UpdateForm < ApiForm
      params do
        required(:data).schema do
          optional(:attributes).schema do
            optional(:name).filled(:string)
            optional(:"document-file-id").filled(:string)
          end
          optional(:relationships).schema do
            optional(:folder).filled.schema(RequiredBelongsToSchema)
          end
        end
      end
    end
  end
end
