# frozen_string_literal: true

require "rails_helper"

RSpec.describe Api::V1::StripeCheckoutSessionSerializer, type: :serializer do
  let(:stripe_checkout) { StripeCheckoutSession.new(id: "test_id") }
  let(:expected_result) do
    {
      data: {
        id: "test_id",
        type: "stripe-checkout-sessions",
      }
    }
  end

  it "serialize wiki page in the correct way" do
    expect(serialize(stripe_checkout)).to eq expected_result
  end
end
