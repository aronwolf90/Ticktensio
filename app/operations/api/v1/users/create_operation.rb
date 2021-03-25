# frozen_string_literal: true

module Api::V1
  module Users
    class CreateOperation < ApiOperation
      @form = CreateForm
      @deserializer = Users::CreateDeserializer
      @model = User
      @policy = UserPolicy
      include StandardCreateOperationConcern
      pass :update_subscription

      def update_subscription(options, **args)
        Organization.subscription&.update(
          quantity: User.count
        )
      end
    end
  end
end
