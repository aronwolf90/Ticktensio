# frozen_string_literal: true

require "rails_helper"

describe Api::V1::Comments::CreateForm do
  subject { described_class.call(params) }

  let(:params) do
    {
      data: {
        attributes: { content: "comment" },
        relationships: {
          issue: { data: { id: "1", type: "issues" } },
          user: { data: { id: "1", type: "users" } }
        }
      }
    }
  end

  before do
    allow(Issue).to receive(:exists?).with("1").and_return(true)
    allow(User).to receive(:exists?).with("1").and_return(true)
  end

  context "with valid params" do
    it "form is valid" do
      expect(subject).to be_success
    end
  end

  context "without content" do
    before { params[:data][:attributes][:content] = nil }

    it "it has an error: content must be filled" do
      expect(subject.errors.to_h).to eq(data: { attributes: { "content": ["must be filled"] } })
    end
  end

  context "without user_id" do
    before { params[:data][:relationships][:user] = nil }

    it "it has an error: user_id must be filled" do
      expect(subject.errors.to_h).to eq(data: { relationships: { "user": ["must be filled"] } })
    end
  end

  context "without issue" do
    before { params[:data][:relationships][:issue] = nil }

    it "it has an error: issue_id must be filled" do
      expect(subject.errors.to_h).to eq(data: { relationships: { "issue": ["must be filled"] } })
    end
  end
end
