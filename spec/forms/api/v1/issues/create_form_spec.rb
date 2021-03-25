# frozen_string_literal: true

require "rails_helper"

describe Api::V1::Issues::CreateForm do
  subject { described_class.call(params) }

  let(:params) do
    {
      data: {
        attributes: {
          title: "title",
          description: "description"
        },
        relationships: {
          project: { data: { id: "1", type: "project" } },
          "board-list": { data: { id: "1", type: "board-lists" } }
        }
      }
    }
  end

  context "with valid params" do
    it "form is valid" do
      expect(subject).to be_success
    end
  end

  context "when project is null" do
    before { params[:data][:relationships][:project][:data] = nil }

    it "it has an error" do
      expect(subject).to be_failure
    end
  end

  context "with invalid project id" do
    before { params[:data][:relationships][:project][:data][:id] = nil }

    it "it has an error: id must be filled" do
      expect(subject.errors.to_h).to eq(
        data: { relationships: {
          project: { data: { id: ["must be filled"] } }
        } }
      )
    end
  end

  context "with invalid board list id" do
    before { params[:data][:relationships][:"board-list"][:data][:id] = nil }

    it "it has an error: id must be filled" do
      expect(subject.errors.to_h).to eq(
        data: { relationships: {
          "board-list": { data: { id: ["must be filled"] } }
        } }
      )
    end
  end
end
