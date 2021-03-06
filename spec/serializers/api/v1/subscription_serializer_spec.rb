# frozen_string_literal: true

require "rails_helper"

RSpec.describe Api::V1::SubscriptionSerializer, type: :serializer do
  let(:subscription) do
    Subscription.new(
      iban_last4: "2424",
      premia: 0
    )
  end
  let(:expected_result) do
    {
      data: {
        id: "subscription",
        type: "subscriptions",
        attributes: {
          "iban-last4": subscription.iban_last4,
          "premia": 0
        }
      }
    }
  end

  it "serialize record in the correct way" do
    expect(serialize(subscription)).to eq expected_result
  end
end
