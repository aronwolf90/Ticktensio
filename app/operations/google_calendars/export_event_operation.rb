# frozen_string_literal: true

module GoogleCalendars
  class ExportEventOperation < ApplicationOperation
    pass :authorize
    pass :get_google_calendar_event
    step :check
    pass :call_google_api
    pass :update_event

  private
    def authorize(ctx, organization:, **)
      ctx[:google_authorization_data] =
        GoogleCalendars::AuthorizeOperation.(organization: organization)[:google_authorization_data]
    end

    def get_google_calendar_event(ctx, event:, google_authorization_data:, organization:, **)
      return if event.google_calendar_event_id.nil?

      ctx[:google_calendar_event] =
        GoogleCalendarClient.get_event(
          organization.google_calendar_id,
          event.google_calendar_event_id,
          google_authorization_data: google_authorization_data
        )
    rescue Google::Apis::ClientError
    end

    def check(ctx, event:, google_calendar_event: nil, **)
      return false if event.deleted? && google_calendar_event.nil?
      return true if google_calendar_event.nil?
      return true if event.deleted? && google_calendar_event.status != "cancelled"
      return false if event.deleted? && google_calendar_event.status == "cancelled"

      event.updated_at > google_calendar_event.updated
    end

    def call_google_api(ctx, event:, google_calendar_event: nil, organization:, **)
      if event.deleted?
        GoogleCalendarClient.delete_event(
          google_calendar_id: organization.google_calendar_id,
          google_calendar_event_id: event.google_calendar_event_id,
          google_authorization_data: organization.google_calendar_authorization_data
        )
      elsif google_calendar_event.present?
        GoogleCalendarClient.update_event(
          google_calendar_id: organization.google_calendar_id,
          google_calendar_event_id: event.google_calendar_event_id,
          title: event.title,
          description: event.description,
          start_time: {
            date_time: event.start_time.rfc3339
          },
          end_time: {
            date_time: event.end_time.rfc3339
          },
          google_authorization_data: organization.google_calendar_authorization_data
        )
      else
        ctx[:google_calendar_event] =
          GoogleCalendarClient.create_event(
            google_calendar_id: organization.google_calendar_id,
            title: event.title,
            description: event.description,
            start_time: {
              date_time: event.start_time.rfc3339
            },
            end_time: {
              date_time: event.end_time.rfc3339
            },
            google_authorization_data: organization.google_calendar_authorization_data
          )
      end
    end

    def update_event(_, event:, google_calendar_event:, **)
      event.update!(google_calendar_event_id: google_calendar_event.id)
    end
  end
end
