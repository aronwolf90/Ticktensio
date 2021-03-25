# frozen_string_literal: true

module Api::V1
  module Users
    module Configuration
      class UpdateForm < ApiForm
        params do
          types = Dry::Types["strict.string"].enum("Admin", "Employee", "Customer")

          required(:data).schema do
            optional(:attributes).schema do
              optional(:type).filled(types)
            end
          end
        end
      end
    end
  end
end
