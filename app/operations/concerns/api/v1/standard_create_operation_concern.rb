# frozen_string_literal: true

module Api::V1
  module StandardCreateOperationConcern
    extend ActiveSupport::Concern

    included do
      pass self::Model(@model, :new)
      step ValidateStep.new(form: @form)
      pass DeserializeStep.new(deserializer: @deserializer)
      step self::Policy::Pundit(@policy, :create?) if @policy
      unless @no_mutation_step
        pass CreateMutationStep
      end
    end
  end
end
