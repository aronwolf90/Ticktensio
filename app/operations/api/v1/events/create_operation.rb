# frozen_string_literal: true

module Api::V1
  module Events
    class CreateOperation < ApiOperation
      @form = CreateForm
      @deserializer = EventDeserializer
      @model = Event
      @policy = EventPolicy
      @no_mutation_step = true
      pass :organization
      include StandardCreateOperationConcern
      pass :main_operation

    private
      def organization(ctx, **)
        ctx[:organization] = Organization.current
      end

      def main_operation(_, model:, deserialized_params:, organization:, **)
        ::Events::CreateOperation.(
          model: model,
          attributes: deserialized_params,
          organization: organization
        )
      end
    end
  end
end
