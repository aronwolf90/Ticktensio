# frozen_string_literal: true

require "rails_helper"
require_relative "../../shared_examples/standart_actions"

RSpec.describe Administration::Admin::PaymentsController, type: :controller do
  let(:user) { Admin.new }
  let(:params) { { stripe_session_id: "stripe_session_id" }  }

  include_examples "standard index action", Administration::Admin::Payments
end
