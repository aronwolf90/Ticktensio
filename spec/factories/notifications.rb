# frozen_string_literal: true

FactoryBot.define do
  factory :notification do
    subject { "Notification subject" }
    body { "Notification body" }
  end
end
