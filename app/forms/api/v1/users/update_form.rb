# frozen_string_literal: true

module Api::V1
  module Users
    class UpdateForm < ApiForm
      params do
        required(:data).schema do
          optional(:relationships).schema do
            optional(:'selected-project').schema(OptionalBelongsToSchema)
          end
        end
      end
    end
  end
end
