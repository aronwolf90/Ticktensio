
# frozen_string_literal: true

module Notifications
  class CreateOperation < ApplicationOperation
    pass :call_create_mutation

  private
    def call_create_mutation(options, params:, **args)
      Notifications::CreateMutation.call(**params)
    end
  end
end
