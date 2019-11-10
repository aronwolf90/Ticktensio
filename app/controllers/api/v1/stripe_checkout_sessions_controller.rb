# frozen_string_literal: true

module Api
  module V1
    class StripeCheckoutSessionsController < ApiController
      include StandartActions
      namespace StripeCheckoutSessions

      public :create
    end
  end
end
