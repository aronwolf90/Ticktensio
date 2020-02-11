# frozen_string_literal: true

require "rails_helper"

RSpec.describe Api::V1::NotificationSerializer, type: :serializer do
  let(:notification) do
    Notification.new(
      id: 1,
      subject: "Notifications subject",
      body: "Notifications body",
      created_at: "2019-02-17 17:00:00.000000000 +0100"
    )
  end
  let(:expected_result) do
    {
      data: {
        id: "1",
        type: "notifications",
        attributes: {
          subject: "Notifications subject",
          body: "Notifications body",
          "created-at": "2019-02-17 17:00:00.000000000 +0100".to_time
        }
      }
    }
  end

  it "serialize notification in the correct way" do
    expect(serialize(notification)).to eql expected_result
  end
end
