# frozen_string_literal: true

require "rails_helper"

describe Api::V1::Contacts::UpdateForm do
  subject { described_class.call(params) }

  let(:params) do
    {
      data: {
        attributes: {
          "lastname": "Name",
          "firstname": "Frantz",
          "kind": "person",
          "address_city": "Augsburg",
          "address_zip": "86153",
          "address_country": "germany",
          "address_steet": "Street",
          "address_number": "8"
        }
      }
    }
  end

  context "with valid params" do
    it { is_expected.to be_success }
  end

  context "without start-time" do
    before { params[:data][:attributes][:kind] = nil }

    it "it has an error: content must be filled" do
      expect(subject.errors.to_h)
        .to eq(data: { attributes: { kind: ["must be filled"] } })
    end
  end
end
