# frozen_string_literal: true

require "rails_helper"

RSpec.describe MoreCollectionQuery do
  subject do
    described_class.(
      board_list.issues,
      more_id: more_id,
      per_page: per_page,
      sort_key: :ordinal_number
    )
  end

  let(:board_list) { create(:board_list) }
  let!(:issue1) {
    create(:issue, id: 1, board_list: board_list, ordinal_number: 1)
  }
  let!(:issue2) {
    create(:issue, id: 2, board_list: board_list, ordinal_number: 2)
  }
  let(:per_page) { 10 }

  context "when more_id is present and is not last issue" do
    let(:more_id) { 1 }

    it "returns the entries that are sorted after the entry with the more_id" do
      is_expected.to have_attributes(collection: [issue2], has_more: false)
    end
  end

  context "when more_id is present and is the last issue" do
    let(:more_id) { 2 }

    it "returns the entries that are sorted after the entry with the more_id" do
      is_expected.to have_attributes(collection: [], has_more: false)
    end
  end

  context "whem more_id is not present" do
    let(:more_id) { nil }

    it "returns the collection" do
      is_expected.to have_attributes(collection: [issue1, issue2], has_more: false)
    end
  end
end
