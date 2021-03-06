# frozen_string_literal: true

require "rails_helper"

RSpec.describe Project, type: :model do
  it { is_expected.to have_many :board_lists }
  it { is_expected.to have_many :issues }
  it { is_expected.to have_many :records }
  it { is_expected.to have_many :user_projects }
  it { is_expected.to have_many :users }
  it { is_expected.to have_many :project_record_days }
end
