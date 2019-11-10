# frozen_string_literal: true

module Api::V1
  module StripeCheckoutSessions
    class CreateOperation < ApiOperation
      @form = CreateForm
      @deserializer = StripeCheckoutSessionDeserializer
      @model = StripeCheckoutSession
      include StandardCreateOperationConcern
    end
  end
end
