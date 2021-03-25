# frozen_string_literal: true

module GoogleCalendars
  class ExportEventsOperation < ApplicationOperation
    pass :trigger_export_events

  private
    def trigger_export_events(_, organization:, **)
      Event.find_each do |event|
        GoogleCalendars::ExportEventJob.perform_later(organization, event.id)
      end
    end
  end
end
