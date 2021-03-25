# frozen_string_literal: true

module GoogleCalendars
  class CreateCallbackOperation < ApplicationOperation
    include ApplicationHelper

    pass :get_authorization
    pass :create_google_calendar
    pass :create_web_hook
    pass :mutate
    pass :export_events

  private
    def get_authorization(ctx, code:, organization:, **)
      ctx[:google_authorization_data] = GoogleCalendarClient.get_access_token(code: code)
      if ctx[:google_authorization_data].refresh_token.nil?
        refresh_token = organization.google_calendar_authorization_data.refresh_token
        ctx[:google_authorization_data] =
          ctx[:google_authorization_data].new(refresh_token: refresh_token)
      end
    end

    def create_google_calendar(ctx, google_authorization_data:, organization:, **)
      ctx[:calendar] = GoogleCalendarClient.create_calendar(
        name: organization.name,
        google_authorization_data: google_authorization_data
      )
    end

    def create_web_hook(ctx, calendar:, google_authorization_data:, organization:, **)
      return unless Settings.google_calendar.web_hook

      GoogleCalendarClient.watch(
        google_calendar_id: calendar.id,
        google_authorization_data: google_authorization_data,
        url: google_calendar_notification_url(organization.name)
      )
    end

    def mutate(_, organization:, calendar:, google_authorization_data:, **)
      GoogleCalendars::CreateCallbackMutation.(
        organization: organization,
        calendar: calendar,
        google_calendar_authorization_data: google_authorization_data
      )
    end

    def export_events(ctx, organization:, **)
      GoogleCalendars::ExportEventsJob.perform_later(organization)
    end
  end
end
