# frozen_string_literal: true

module Api::V1
  module Records
    class UpdateForm < ApiForm
      params do
        required(:data).schema do
          optional(:attributes).schema do
            optional(:'start-time').filled(:string)
            optional(:complexity).maybe(:any)
          end
          optional(:relationships).schema do
            optional(:user).schema(RequiredBelongsToSchema)
            optional(:issue).schema(RequiredBelongsToSchema)
          end
        end
      end
    end
  end
end
