# frozen_string_literal: true

module NotificationsReadeds
  class CreateMutation < ApplicationMutation
    attr_reader :user, :readed_at

    def initialize(user:, readed_at:)
      @user = user
      @readed_at = readed_at
    end

    def call
      ActiveRecord::Base.transaction do
        user.notifications
          .where(
            ":readed_at IS NULL OR created_at <= :readed_at",
            readed_at: readed_at&.to_date
          )
          .update_all(readed: false, readed: true, updated_at: Time.zone.now)
      end
    end
  end
end
