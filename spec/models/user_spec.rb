# frozen_string_literal: true

require "rails_helper"

RSpec.describe User, type: :model do
  it { is_expected.to have_many(:records) }
  it { is_expected.to have_one(:current_record) }
  it { is_expected.to have_many(:record_days) }
end
