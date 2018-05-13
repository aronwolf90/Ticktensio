# frozen_string_literal: true

require "rails_helper"

RSpec.describe BoardList, type: :model do
  it { is_expected.to belong_to(:project) }
  it { is_expected.to have_many(:issues) }
end
