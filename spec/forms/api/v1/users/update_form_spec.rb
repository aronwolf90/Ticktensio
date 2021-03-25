# frozen_string_literal: true

require "rails_helper"

describe Api::V1::Users::UpdateForm do
  subject { described_class.call(params) }

  before do
    allow(Project).to receive(:exists?).with("1").and_return(true)
  end

  let(:params) do
    {
      data: {
        id: "1",
        type: "users",
        relationships: {
          "selected-project": {
            data: { id: "1", type: "projects" }
          }
        }
      }
    }
  end

  context "with valid params" do
    it "form is valid" do
      expect(subject).to be_success
    end
  end

  # context "when data in nil" do
  #   before { params[:data][:relationships][:"selected-project"][:data] = nil }

  #   it "form is valid" do
  #     expect(subject).to be_success
  #   end
  # end
end
