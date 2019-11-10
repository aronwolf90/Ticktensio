# frozen_string_literal: true

module Records
  class CreateMutation < ApplicationMutation
    def call
      ActiveRecord::Base.transaction do
        model.assign_attributes(attributes)
        model.user = user
        deactivate_active_records if model.active?
        model.save!
        model
      end
    end

    protected
      def deactivate_active_records
        user
          .records
          .active
          .update_all(end_time: Time.zone.now)
      end
  end
end
