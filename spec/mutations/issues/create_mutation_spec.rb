# frozen_string_literal: true

require "rails_helper"

RSpec.describe Issues::CreateMutation do
  subject do
    described_class.call(
      user: current_user,
      model: model
    )
  end

  let(:current_user) { create(:employee) }
  let(:model) { build(:issue, board_list: board_list) }
  let(:board_list) { create(:board_list) }

  specify do
    expect(subject.reload.ordinal_number).to eq(0)
  end
end
