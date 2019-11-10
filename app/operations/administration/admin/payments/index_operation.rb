# frozen_string_literal: true

module Administration
  module Admin
    module Payments
      class IndexOperation < AdministrationOperation
        step :create_subscription

        def create_subscription(options, params:, **args)
          Subscription.create(
            stripe_session_id: params[:stripe_session_id],
            organization_id: Organization.current.id,
            email: ::Admin.first.email,
            quantity: User.count
          )
        end
      end
    end
  end
end
