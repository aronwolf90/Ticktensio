# frozen_string_literal: true

module Api::V1
  module Issues
    class UpdateForm < ApiForm
      params do
        required(:data).schema do
          optional(:attributes).schema do
            optional(:title).filled(:string)
          end
          optional(:relationships).schema do
            optional(:user).schema(RequiredBelongsToSchema)
          end
        end
      end
    end
  end
end
