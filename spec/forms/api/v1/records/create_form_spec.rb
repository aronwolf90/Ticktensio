# frozen_string_literal: true

require "rails_helper"

describe Api::V1::Records::CreateForm do
  subject { described_class.call(params) }

  let(:params) do
    {
      data: {
        attributes: {
          "start-time": Time.zone.now.to_s
        },
        relationships: {
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
    before { params[:data][:attributes].delete :"start-time" }

    it "has an error" do
      expect(subject.errors.to_h).to eq(data: { attributes: { "start-time": ["is missing"] } })
    end
  end

  context "without issue" do
    before { params[:data][:relationships].delete :issue }

    it "has an error" do
      expect(subject.errors.to_h).to eq(data: { relationships: { issue: ["is missing"] } })
    end
  end
end
