# frozen_string_literal: true

require "rails_helper"

describe Api::V1::RecordDeserializer do
  subject { described_class.normalize(params) }

  let(:start_time) { Time.zone.now }
  let(:end_time) { 2.hours.from_now }
  let(:params) do
    {
      attributes: {
        "start-time": start_time,
        "end-time": end_time
      },
      relationships: {
        user: { data: { id: 1, type: "users" } },
        issue: { data: { id: 1, type: "issues" } }
      }
    }
  end
  let(:result) do
    {
      start_time: start_time,
      end_time: end_time,
      user_id: 1,
      issue_id: 1
    }
  end

  context "with valid params" do
    it "form is valid" do
      expect(subject).to eq(result)
    end
  end
end
