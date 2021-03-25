# frozen_string_literal: true

require "rails_helper"

describe Api::V1::BoardLists::UpdateForm do
  subject { described_class.call(params) }

  let(:params) do
    {
      data: {
        id: "1",
        type: "board-lists",
        attributes: { name: "name" },
        relationships: {
          issues: { data: [{ id: "1", type: "issues" }] }
        }
      }
    }
  end

  before do
    allow(Issue).to receive(:exists?).with("1").and_return(true)
  end

  context "with valid params" do
    it "form is valid" do
      expect(subject).to be_success
    end
  end

  context "without issue_id==nil" do
    before { params[:data][:relationships][:issues][:data][0][:id] = nil }

    it "it has an error: id must be filled" do
      expect(subject.errors.to_h).to eq(
        data: { relationships: {
          "issues": { data: { 0 => { id: ["must be filled"] } } }
        } }
      )
    end
  end

  context "without project_id==nil" do
    before do
      params[:data][:relationships][:project] = { data: { id: nil } }
    end

    it "it has an error: id must be filled" do
      expect(subject.errors.to_h).to eq(
        data: { relationships: {
          "project": { data: { id: ["must be filled"], type: ["is missing"] } }
        } }
      )
    end
  end
end
