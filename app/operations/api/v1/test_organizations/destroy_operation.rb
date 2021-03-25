# frozen_string_literal: true

module Api::V1
  module TestOrganizations
    class DestroyOperation < ApiOperation
      pass :model
      pass :mutation

    private
      def model(options, **)
        options[:model] = Organization.find_by(name: "test-organization")
      end

      def mutation(options, model:, **args)
        return if model.nil?

        ::Organizations::DestroyMutation.call(model: model)
      end
    end
  end
end
