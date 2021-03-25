# frozen_string_literal: true

module GoogleCalendars
  class ImportEventOperation < ApplicationOperation
    pass :authorize
    pass :get_event
    step :check
    pass :save_or_delete_event

  private
    def authorize(ctx, organization:, **)
      ctx[:google_authorization_data] =
        GoogleCalendars::AuthorizeOperation
        .call(organization: organization)[:google_authorization_data]
    end

    def get_event(ctx, google_calendar_event:, **)
      ctx[:event] =
        Event.find_or_initialize_by(google_calendar_event_id: google_calendar_event.id)
    end

    def check(ctx, event:, google_calendar_event:, **)
      return true if event.updated_at.nil?
      return true if google_calendar_event.status == "cancelled"

      event.updated_at < google_calendar_event.updated
    end

    def save_or_delete_event(_, event:, google_calendar_event:, **)
      if google_calendar_event.status == "cancelled"
        event.destroy!
      else
        event.update!(
          title: google_calendar_event.summary || " ",
          start_time: google_calendar_event.start.date_time || google_calendar_event.start.date,
          end_time: google_calendar_event.end.date_time || google_calendar_event.end.date,
          description: google_calendar_event.description
        )
      end
    end
  end
end
