# frozen_string_literal: true

module Api::V1
  module Projects
    class CreateForm < ApiForm
      params do
        required(:data).schema do
          required(:attributes).schema do
            required(:name).filled(:string)
          end
          optional(:relationships).schema do
            optional(:contact).schema do
              optional(:data).schema do
                optional(:attributes).schema do
                  required(:name).filled(:string)
                end
              end
            end
          end
        end
      end
    end
  end
end
