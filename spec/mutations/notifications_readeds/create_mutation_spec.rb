# frozen_string_literal: true

require "rails_helper"

RSpec.describe NotificationsReadeds::CreateMutation do
  subject do
    described_class.call(
      user: current_user,
      readed_at: readed_at
    )
  end

  let(:current_user) { create(:admin) }

  before do
    create(
      :notification,
      readed: false,
      user: current_user,
      created_at: '15.01.2018 17:00:00"'
    )
    create(:notification, readed: false, user: current_user)
    create(:notification, readed: false, user: current_user)
  end

  context "when readed_at is present" do
    let(:readed_at) { "15.01.2019 17:00:00" }

    it "change readed=true for all created_at<=readed_at" do
      expect { subject }
        .to change { Notification.where(readed: false).count }.by(-1)
    end
  end

  context "when readed_at is present" do
    let(:readed_at) { nil }

    it "change all to readed=true" do
      expect { subject }
        .to change { Notification.where(readed: false).count }.to(0)
    end
  end
end
