# frozen_string_literal: true

module Registrations
  class CreateMutation < ApplicationMutation
    def call
      ActiveRecord::Base.transaction do
        model.organization = create_organization
        Apartment::Tenant.switch(organization_name) do
          create_user
        end
        model
      end
    end

    private
      def create_organization
        mutation(Organization, :create).call(
          name: organization_name,
          time_zone: attributes[:time_zone]
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

      def organization_name
        @organization_name ||= attributes[:name].to_domain
      end
  end
end
