# frozen_string_literal: true

FactoryBot.define do
  factory :event do
    title "Title"
    start_time "2018-10-20 17:15:06"
    duration 1.hour
  end
end
