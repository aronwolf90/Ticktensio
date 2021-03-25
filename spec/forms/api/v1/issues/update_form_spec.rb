# frozen_string_literal: true

require "rails_helper"

describe Api::V1::Issues::UpdateForm do
  subject { described_class.call(params) }

  let(:params) do
    {
      data: {
        attributes: {
          title: "title"
        },
        relationships: {
          user: { data: { id: "1", type: "users" } }
        }
      }
    }
  end

  before do
    allow(User).to receive(:exists?).with(1).and_return(true)
    allow(User).to receive(:exists?).with(nil).and_return(false)
  end

  context "with valid params" do
    it "form is valid" do
      expect(subject).to be_success
    end
  end

  it "is valid when description is blank" do
    params[:data][:attributes][:description] = ""

    expect(subject).to be_success
  end

  context "without user id" do
    before { params[:data][:relationships][:user][:data][:id] = nil }

    it "it has an error: id must be filled" do
      expect(subject.errors.to_h).to eq(
        data: { relationships: {
          user: { data: { id: ["must be filled"] } }
        } }
      )
    end
  end
end
