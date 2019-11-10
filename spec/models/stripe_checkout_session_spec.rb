# frozen_string_literal: true

require "rails_helper"

RSpec.describe StripeCheckoutSession, type: :model do
  it "#create" do
    expect(RestClient).to receive(:post).with(
      "http://payment:4000/api/v1/stripe_session",
      {
        data: {
          attributes: {
            cancel_url: "lvh.me/admin/payment",
            success_url:  "lvh.me/admin/payment?session_id={CHECKOUT_SESSION_ID}"
          }
        }
      },
      {
        "Authorization": "Basic YWRtaW46dGVzdHRlc3Q=",
        "Content-Type": "application/json"
      }
    ).and_return(
      instance_double(
        RestClient::Response,
        body: {
          "data" => {
            "id" => "cs_test_8fh4A"
          }
        }.to_json
      )
    )
    stripe_checkout_session = described_class.new
    stripe_checkout_session.create
    expect(stripe_checkout_session.id).to eq("cs_test_8fh4A")
  end
end
