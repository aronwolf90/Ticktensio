# frozen_string_literal: true

class StripeCheckoutSession < ActiveModelSerializers::Model
  include ApplicationHelper
  attributes :id

  def create
    url = "#{Settings.payment.host}/api/v1/stripe_session"
    organization_url = organization_url(Organization.current)

    data = {
      data: {
        attributes: {
          cancel_url: "#{organization_url}/admin/payment",
          success_url:  "#{organization_url}/admin/payment?session_id={CHECKOUT_SESSION_ID}"
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
