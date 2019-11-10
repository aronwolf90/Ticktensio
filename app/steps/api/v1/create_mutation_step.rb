# frozen_string_literal: true

module Api::V1
  class CreateMutationStep < ApiStep
    def self.call(options, deserialized_params:, model:, current_user:, **)
      mutation(model, :create).call(
        user: current_user,
        **deserialized_params
      )
    end
  end
end
