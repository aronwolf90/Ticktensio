# frozen_string_literal: true

require "rails_helper"

describe Api::V1::Events::UpdateForm do
  subject { described_class.call(params) }

  let(:params) do
    {
      data: {
        attributes: {
          "title": "Title"
        }
      }
    }
  end

  context "with valid params" do
    it { is_expected.to be_success }
  end

  context "without start-time" do
    before { params[:data][:attributes][:"start-time"] = nil }

    it "it has an error: content must be filled" do
      expect(subject.errors.to_h).to eq(data: { attributes: { "start-time": ["must be filled"] } })
    end
  end
end
