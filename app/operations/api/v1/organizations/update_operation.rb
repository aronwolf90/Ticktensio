# frozen_string_literal: true

module Api::V1
  module Organizations
    class UpdateOperation < ApiOperation
      pass :model
      step ValidateStep.new(form: UpdateForm)
      pass DeserializeStep.new(deserializer: OrganizationDeserializer)
      step Policy::Pundit(OrganizationPolicy, :update?)
      pass UpdateMutationStep

    private
      def model(options, **)
        options[:model] = Organization.current
      end
    end
  end
end
