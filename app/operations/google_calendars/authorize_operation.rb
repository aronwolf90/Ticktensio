# frozen_string_literal: true

module GoogleCalendars
  class AuthorizeOperation < ApplicationOperation
    pass :authorize
    pass :persist

  private
    def authorize(ctx, organization:, **)
      ctx[:google_authorization_data] =
        GoogleCalendarClient.authorize!(
          google_authorization_data: organization.google_calendar_authorization_data
        )
    end

    def persist(ctx, organization:, google_authorization_data:, **)
      organization.update!(google_calendar_authorization_data: google_authorization_data)
    end
  end
end
