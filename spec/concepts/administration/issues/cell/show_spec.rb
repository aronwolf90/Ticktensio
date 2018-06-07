# frozen_string_literal: true

require "rails_helper"

RSpec.describe Administration::Issues::Cell::Show, type: :cell do
  controller Administration::IssuesController

  subject { cell(described_class, build_stubbed(:issue)).() }


  it { is_expected.to have_selector("issue") }
end