# frozen_string_literal: true

module Api::V1
  module Events
    class DestroyOperation < ApiOperation
      pass Model(Event, :find)
      pass :main_operation

    private
      def main_operation(_, model:, organization:, **)
        ::Events::DestroyOperation.(
          event: model,
          organization: organization
        )
      end
    end
  end
end
