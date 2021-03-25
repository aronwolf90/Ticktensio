# frozen_string_literal: true

require "rails_helper"

describe Api::V1::WikiPages::CreateForm do
  subject { described_class.call(params) }

  let(:params) do
    {
      data: {
        attributes: {
          "title": "Title"
        },
        relationships: {
          "wiki-category": {
            data: {
              id: "1",
              type: "wiki-categories"
            }
          }
        }
      }
    }
  end

  context "with valid params" do
    it { is_expected.to be_success }
  end

  context "without name" do
    before { params[:data][:attributes][:title] = nil }

    it "it has an error: content must be filled" do
      expect(subject.errors.to_h).to eq(data: { attributes: { title: ["must be filled"] } })
    end
  end
end
