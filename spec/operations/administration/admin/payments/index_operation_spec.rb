# frozen_string_literal: true

require "rails_helper"

RSpec.describe Administration::Admin::Payments::IndexOperation do
  subject do
    described_class.(params: params, current_user: current_user)
  end

  let(:current_user) { Admin.new(email: "test@example.com") }
  let(:organization) { Organization.new(id: 1) }

  before do
    allow(Organization).to receive(:current).and_return(organization)
    allow(Admin).to receive(:first).and_return(current_user)
    allow(Subscription).to receive(:create)
    allow(User).to receive(:count).and_return(1)
  end

  context "when the params are empty" do
    let(:params) { {} }

    it "not Subscription.create" do
      subject
      expect(Subscription).not_to have_received(:create)
    end
  end

  context "when stripe_session_id is in the params" do
    let(:params) { { stripe_session_id: "test_id" } }

    it "call Subscription.create" do
      subject
      expect(Subscription).to have_received(:create).with(
        stripe_session_id: "test_id",
        organization_id: 1,
        email: "test@example.com",
        quantity: 1
      )
    end
  end
end
