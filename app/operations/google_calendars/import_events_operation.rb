# frozen_string_literal: true

module GoogleCalendars
  class ImportEventsOperation < ApplicationOperation
    pass :authorize
    pass :get_google_calendar_events
    pass :trigger_event_importers
    pass :save_sync_token

  private
    def authorize(ctx, organization:, **)
      ctx[:google_authorization_data] =
        GoogleCalendars::AuthorizeOperation.(organization: organization)[:google_authorization_data]
    end

    def get_google_calendar_events(
      ctx,
      organization:,
      google_authorization_data:,
      **
    )
      ctx[:google_calendar_events] =
        GoogleCalendarClient.list_events(
          organization.google_calendar_id,
          google_authorization_data: google_authorization_data,
          sync_token: organization.sync_token
        )
    end

    def trigger_event_importers(ctx, organization:, google_calendar_events:, **)
      google_calendar_events.items.each do |google_calendar_event|
        GoogleCalendars::ImportEventJob.perform_later(
          organization,
          google_calendar_event.to_json
        )
      end
    end

    def save_sync_token(ctx, organization:, google_calendar_events:, **)
      organization.update!(sync_token: google_calendar_events.next_sync_token)
    end
  end
end
