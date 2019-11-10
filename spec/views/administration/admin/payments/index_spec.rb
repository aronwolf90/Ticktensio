# frozen_string_literal: true

require "rails_helper"

RSpec.describe "administration/admin/payments/index" do
  helper AdministrationHelper

  subject { rendered }

  before do
    sign_in(Admin.new)
    render
  end

  it "render payment" do
    expect(subject).to have_css "payment"
  end
end
