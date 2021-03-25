# frozen_string_literal: true

module Api::V1
  module Users
    class DestroyOperation < ApiOperation
      pass Model(User, :find)
      pass :destroy
      pass :update_subscription

    private
      def destroy(options, model:, current_user:, **args)
        ::Users::DestroyMutation.call(
          model: model,
          current_user: current_user
        )
      end

      def update_subscription(options, **args)
        Organization.subscription&.update(
          quantity: User.count
        )
      end
    end
  end
end
