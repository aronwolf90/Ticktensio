# frozen_string_literal: true

module Organizations
  class CreateMutation < ApplicationMutation
    def call
      ActiveRecord::Base.transaction do
        Apartment::Tenant.create(name) unless ActiveRecord::Base.connection.schema_exists?(name)
        model.update!(attributes.merge(time_zone_seconds: time_zone_seconds))
        model
      end
    end

    private
      def time_zone_seconds
        @time_zone_seconds ||=
          Time.now.in_time_zone(attributes[:time_zone]).utc_offset
      end

      def name
        attributes[:name]
      end
  end
end
