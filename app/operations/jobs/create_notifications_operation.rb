# frozen_string_literal: true

module Jobs
  class CreateNotificationsOperation < ApplicationOperation
    pass :get_data
    pass :call_create_mutation

  private
    def get_data(options, date:, **)
      options[:query_result] = Jobs::CreateNotificationsQuery.call(date: date)
    end

    def call_create_mutation(options, query_result:, **args)
      options[:notifications] = Jobs::CreateNotificationsMutation.call(
        issues_deadline_at: query_result.issues_deadline_at,
        issues_due_at: query_result.issues_due_at
      )
    end
  end
end
