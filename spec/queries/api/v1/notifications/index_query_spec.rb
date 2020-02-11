# frozen_string_literal: true

require "rails_helper"

RSpec.describe Api::V1::Notifications::IndexQuery do
  subject do
    described_class.call(more_id: more_id, per_page: per_page)
  end

  let(:user) { create(:admin) }
  let!(:notification1) { create(:notification, id: 1, user: user) }
  let!(:notification2) { create(:notification, id: 2, user: user) }
  let!(:notification3) { create(:notification, id: 3, user: user) }

  context "when per_page is present and more_id=nil" do
    let(:more_id) { nil }
    let(:per_page) { 2 }

    it "return first n (per_page) issues" do
      expect(subject).to have_attributes(
        collection: [notification3, notification2],
        has_more: true,
        unread_count: 3
      )
    end
  end

  context "when issues exist after more_id" do
    let(:more_id) { 2 }
    let(:per_page) { 2 }

    it "return the issues after more_id" do
      expect(subject).to have_attributes(
        collection: [notification1],
        has_more: false,
        unread_count: 3
      )
    end
  end
end
