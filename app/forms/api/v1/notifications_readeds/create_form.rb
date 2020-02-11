# frozen_string_literal: true

module Api::V1
  module NotificationsReadeds
    class CreateForm < ApiForm
      @form = Dry::Validation.Schema do
        configure do
          predicates(ApiPredicates)
          config.type_specs = true
        end

        optional(:data).schema do
          optional(:attributes).schema do
            # optional(:"readed-at", Dry::Types["params.date_time"]).filled(:date_time?)
          end
        end
      end
    end
  end
end
