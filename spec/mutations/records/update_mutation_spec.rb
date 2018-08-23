# frozen_string_literal: true

require "rails_helper"

RSpec.describe Records::UpdateMutation do
  subject do
    described_class.call(user: current_user, model: record, **attributes)
  end

  let(:current_user) { create(:admin) }
  let(:record) { create(:record, user: current_user) }

  context "new record is active" do
    let(:attributes) do
      {
        end_time: nil
      }
    end

    context "with active record" do
      let!(:other_record) { create(:record, user: current_user, end_time: nil) }

      it "activate record" do
        expect do
          subject
          record.reload
        end.to change(record, :active?).from(false).to(true)
      end

      it "deactivate old record" do
        subject
        expect(other_record.reload).to be_inactive
      end
    end

    context "with no active record" do
      it "create new record" do
        expect do
          subject
          record.reload
        end.to change(record, :active?).from(false).to(true)
      end
    end
  end

  context "new record is not active" do
    let!(:other_record) { create(:record, user: current_user, end_time: nil) }
    let(:attributes) do
      {
        start_time: Time.parse("2018-05-17 20:27:45"),
        end_time: Time.parse("2018-06-17 20:27:45")
      }
    end

    it "create new record" do
      expect { subject }.to change { current_user.records.count }.by(1)
      expect(Record.last.attributes.symbolize_keys).to include attributes
    end

    it "not deactivate old record" do
      expect(other_record.reload).to be_active
    end
  end
end
