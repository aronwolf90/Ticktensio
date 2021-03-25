# frozen_string_literal: true

module Events
  class ExportOperation < ApplicationOperation
    pass :exporters!
    pass :trigger_exporters

  private
    def exporters!(options, **)
      options[:exporters] ||= [GoogleCalendars::ExportEventJob]
    end

    def trigger_exporters(_, organization:, exporters:, event:, **)
      exporters.each do |exporter|
        exporter.perform_later(organization, event.id)
      end
    end
  end
end
