# frozen_string_literal: true

module Api::V1
  module NotificationsReadeds
    class CreateOperation < ApiOperation
      step ValidateStep.new(form: NotificationsReadeds::CreateForm)
      pass DeserializeStep.new(deserializer: NotificationsReadedDeserializer)
      pass :mutation

    private
      def mutation(options, deserialized_params:, current_user:, **args)
        ::NotificationsReadeds::CreateMutation.call(
          readed_at: deserialized_params[:readed_at],
          user: current_user
        )
      end
    end
  end
end
