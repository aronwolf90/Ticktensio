# frozen_string_literal: true

module Api::V1
  module StripeCheckoutSessions
    class CreateForm < ApiForm
      @form = Dry::Validation.Schema do; end
    end
  end
end
