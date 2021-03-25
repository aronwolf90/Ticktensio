# frozen_string_literal: true

module Api::V1
  module Calendars
    module GoogleIntegrations
      class DestroyOperation < ApiOperation
        step Policy::Pundit(::Calendars::GoogleIntegrationPolicy, :destroy?)
        pass :main_operation

      private
        def main_operation(ctx, organization:, **)
          ::Calendars::GoogleIntegrations::DestroyOperation.call(
            organization: organization
          )
        end
      end
    end
  end
end
