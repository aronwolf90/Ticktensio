# frozen_string_literal: true

require "rails_helper"

RSpec.describe "administration/issues/show" do
  helper AdministrationHelper

  subject { rendered }

  before do
    sign_in(Admin.new)
    assign(:model, Issue.new)
    render
  end

  it { is_expected.to have_selector("issue") }
end
