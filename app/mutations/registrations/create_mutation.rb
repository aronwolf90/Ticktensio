# frozen_string_literal: true

module Registrations
  class CreateMutation < ApplicationMutation
    def call
      ActiveRecord::Base.transaction do
        model.organization = create_organization
        Apartment::Tenant.create(organization_name)
        Apartment::Tenant.switch(organization_name) do
          create_user
        end
      end
    end

  private

    def create_organization
      Organization.create!(
        name: organization_name,
        time_zone: attributes[:time_zone],
        time_zone_seconds: time_zone_seconds
      )
    end

    def create_user
      Admin.create!(
        firstname: attributes[:firstname],
        lastname: attributes[:lastname],
        email: attributes[:email],
        password: attributes[:password]
      )
    end

    def time_zone_seconds
      @time_zone_seconds ||=
        Time.now.in_time_zone(attributes[:time_zone]).utc_offset
    end

    def organization_name
      @organization_name ||= attributes[:name].underscore.tr("_", "-")
    end
  end
end
