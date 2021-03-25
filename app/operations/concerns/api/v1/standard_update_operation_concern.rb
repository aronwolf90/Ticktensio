# frozen_string_literal: true

module Api::V1
  module StandardUpdateOperationConcern
    extend ActiveSupport::Concern

    included do
      pass self::Model(@model, :find)
      step ValidateStep.new(form: @form)
      pass DeserializeStep.new(deserializer: @deserializer)
      step self::Policy::Pundit(@policy, :update?) if @policy
      unless @no_mutation_step
        pass UpdateMutationStep
      end
    end
  end
end
