# frozen_string_literal: true

module Api::V1
  module Records
    class CreateForm < ApiForm
      params do
        required(:data).schema do
          required(:attributes).schema do
            required(:"start-time").filled(:string)
          end
          required(:relationships).schema do
            required(:issue).schema(RequiredBelongsToSchema)
          end
        end
      end
    end
  end
end
