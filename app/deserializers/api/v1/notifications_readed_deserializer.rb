# frozen_string_literal: true

module Api::V1
  class NotificationsReadedDeserializer < ApiDeserializer
    attribute :readed_at
  end
end
