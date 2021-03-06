# frozen_string_literal: true

require "rails_helper"

RSpec.describe User, type: :model do
  it { is_expected.to have_many(:records) }
  it { is_expected.to have_one(:current_record) }
  it { is_expected.to have_many(:record_days) }
  it { is_expected.to have_many(:user_projects) }
  it { is_expected.to have_many(:projects) }
  it { is_expected.to have_many(:worked_issues) }
  it do
    expect(subject.avatar.url)
      .to include("avatar_placeholder")
  end

  it "#records_count" do
    expect(create(:admin).records_count).to eq(0)
  end
end
