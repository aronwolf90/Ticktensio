# frozen_string_literal: true

require "rails_helper"

describe Api::V1::NotificationsReadedDeserializer do
  subject { described_class.normalize(params) }

  let(:params) do
    {
      attributes: {
        "readed-at": "2019-01-01 15:00:00",
      }
    }
  end
  let(:result) do
    {
      "readed_at": "2019-01-01 15:00:00"
    }
  end

  it "deserialize it in the correct way" do
    expect(subject).to eq(result)
  end
end
