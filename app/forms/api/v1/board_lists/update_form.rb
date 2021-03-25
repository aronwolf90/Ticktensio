# frozen_string_literal: true

module Api::V1
  module BoardLists
    class UpdateForm < ApiForm
      params do
        optional(:data).schema do
          optional(:relationships).schema do
            optional(:issues).schema(RequiredMasManySchema)
            optional(:project).schema(OptionalBelongsToSchema)
          end
        end
      end
    end
  end
end
