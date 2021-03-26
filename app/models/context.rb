# frozen_string_literal: true
# frozen_string_literal: trule

class Context < ActiveModelSerializers::Model
  include ActiveModel::Model
  attributes(
    :current_user,
    :premium,
    :user_count,
    :time_zone,
    :global_board,
    :google_calendar_integrated,
    :google_calendar_authorization_url,
    :month_spent_time
  )

  delegate :id, to: :current_user, prefix: true
end
