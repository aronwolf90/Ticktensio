# frozen_string_literal: true

require "rails_helper"
require_relative "./shared_examples/standart_actions"

RSpec.describe Api::V1::StripeCheckoutSessionsController, type: :controller do
  include_examples "standard api create action",
                   Api::V1::StripeCheckoutSessions::CreateOperation
end
