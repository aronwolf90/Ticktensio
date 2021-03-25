# frozen_string_literal: true

require "rails_helper"

describe Api::V1::Documents::UpdateForm do
  subject { described_class.call(params) }

  let(:params) do
    {
      data: {
        attributes: {
          "name": "Document name",
          "document-file-id": "1"
        },
        relationships: {
          folder: {
            data: {
              id: "1",
              type: "folders"
            }
          }
        }
      }
    }
  end

  context "with valid params" do
    it { is_expected.to be_success }
  end

  context "when name in nil" do
    before { params[:data][:attributes][:name] = nil }

    it "it has an error: content must be filled" do
      expect(subject.errors.to_h)
        .to eq(data: { attributes: { name: ["must be filled"] } })
    end
  end

  context "when document-file-id in nil" do
    before { params[:data][:attributes][:"document-file-id"] = nil }

    it "it has an error: content must be filled" do
      expect(subject.errors.to_h)
        .to eq(data: { attributes: { "document-file-id": ["must be filled"] } })
    end
  end

  context "when folder is nil" do
    before { params[:data][:relationships][:folder] = nil }

    it { is_expected.to be_failure }
  end
end
