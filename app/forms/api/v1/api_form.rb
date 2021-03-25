# frozen_string_literal: true

module Api
  module V1
    class ApiForm < Dry::Validation::Contract
      def self.call(params)
        new.call(params)
      end

      RequiredBelongsToSchema = Dry::Schema.Params do
        required(:data).filled.schema do
          required(:id).filled
          required(:type).filled(:string)
        end
      end

      OptionalBelongsToSchema = Dry::Schema.Params do
        optional(:data).maybe(:hash) do
          required(:id).filled
          required(:type).filled(:string)
        end
      end

      RequiredMasManySchema = Dry::Schema.Params do
        required(:data).each do
          schema do
            required(:id).filled
            required(:type).filled(:string)
          end
        end
      end
    end
  end
end
