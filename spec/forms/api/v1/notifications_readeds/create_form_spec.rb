# frozen_string_literal: true

require "rails_helper"

describe Api::V1::NotificationsReadeds::CreateForm do
  subject { described_class.call(params) }

  let(:params) do
    {
      data: {
        attributes: {
          "readed-at": "15-01-2019 17:00:00"
        }
      }
    }
  end

  context "with valid params" do
    it "form is valid" do
      expect(subject).to be_success
    end
  end

  xcontext "with invalid readed-at" do
    before { params[:data][:attributes][:"readed-at"] = "invalid" }

    it "it has an error: id must be filled" do
      expect(subject.errors).to eq(
        data: {
          attributes: {
            "readed-at": ["must be a date time"]
        }
      })
    end
  end
end
