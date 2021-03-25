# frozen_string_literal: true

require "rails_helper"

describe Api::V1::Records::UpdateForm do
  subject { described_class.call(params) }

  let(:params) do
    {
      data: {
        id: 1,
        type: "records",
        attributes: {
          "start-time": Time.zone.now.to_s,
          "end-time": 1.hour.from_now.to_s,
          "complexity": "0.5"
        },
        relationships: {
          user: { data: { id: "1", type: "users" } },
          issue: { data: { id: "1", type: "issues" } }
        }
      }
    }
  end

  before do
    allow(User).to receive(:exists?).with(1).and_return(true)
    allow(Issue).to receive(:exists?).with(1).and_return(true)
  end

  context "with valid params" do
    it "form is valid" do
      expect(subject).to be_success
    end
  end

  context "without start_time" do
    before { params[:data][:attributes][:"start-time"] = nil }

    it "has an error" do
      expect(subject.errors.to_h).to eq(data: { attributes: { "start-time": ["must be filled"] } })
    end
  end
end
