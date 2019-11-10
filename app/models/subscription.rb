# frozen_string_literal: true

class Subscription < ApplicationApi
  attributes(
    :id,
    :stripe_session_id,
    :organization_id,
    :email,
    :quantity
  )

  def create
    url = "#{Settings.payment.host}/api/v1/subscriptions"

    data = {
      data: {
        attributes: {
          stripe_session_id: stripe_session_id,
          organization_id: organization_id,
          email: email,
          quantity: quantity
        }
      }
    }

    response = RestClient.post(url, data, Settings.payment.headers.to_h)
    self.id = JSON.parse(response.body)["data"]["id"]
  end

  def update!(_attributes)
    create if id.nil?
  end
end
