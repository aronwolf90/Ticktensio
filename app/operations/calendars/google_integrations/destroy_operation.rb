# frozen_string_literal: true

module Calendars
  module GoogleIntegrations
    class DestroyOperation < ApplicationOperation
      pass :remove_google_integration

    private
      def remove_google_integration(ctx, organization:, **)
        Calendars::GoogleIntegrations::DestroyMutation.call(
          organization: organization
        )
      end
    end
  end
end
