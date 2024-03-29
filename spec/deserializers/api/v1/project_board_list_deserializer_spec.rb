# frozen_string_literal: true

require "rails_helper"

describe Api::V1::ProjectBoardListDeserializer do
  subject { described_class.normalize(params) }

  let(:params) do
    {
      attributes: {
        name: "Test",
        "ordinal-number": 1
      },
      relationships: {
        data: {
          id: 1,
          type: "project-statuses"
        }
      }
    }
  end
  let(:result) do
    {
      name: "Test",
      ordinal_number: 1
    }
  end

  context "with valid params" do
    it "form is valid" do
      expect(subject).to eq(result)
    end
  end
end
