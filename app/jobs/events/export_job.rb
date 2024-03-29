# frozen_string_literal: true

module Events
  class ExportJob < ApplicationJob
    discard_on ActiveRecord::RecordNotFound

    def perform(organization, event_id)
      Apartment::Tenant.switch(organization.name) do
        Events::ExportOperation.(
          event: Event.unscoped.find(event_id),
          organization: organization
        )
      end
    end
  end
end
