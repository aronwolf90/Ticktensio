# frozen_string_literal: true

require "rails_helper"
require_relative "../shared_examples/standard_operations"

RSpec.describe Api::V1::Issues::MoveOperation do
  subject(:call) do
    described_class.call(
      current_user: User.new,
      issue_id: "1",
      before_issue_id: "2",
      board_list_id: "1"
    )
  end

  let(:issue1) { Issue.new }
  let(:issue2) { Issue.new }
  let(:board_list) { BoardList.new }

  before do
    allow(Issue).to receive(:find).with("1").and_return(issue1)
    allow(Issue).to receive(:find_by).with(id: "2").and_return(issue2)
    allow(BoardList).to receive(:find).with("1").and_return(board_list)
    allow(Issues::MoveMutation).to receive(:call)
    allow(IssuePolicy).to receive(:new).and_return(double(move?: true))
  end

  it "call Issues::MoveMutation and succeds" do
    expect(call).to be_success
    expect(Issues::MoveMutation).to have_received(:call)
  end

  context "when IssuePolicy#move?==false" do
    before do
      allow(IssuePolicy).to receive(:new).and_return(double(move?: false))
    end

    it "fails" do
      call

      expect(Issues::MoveMutation).not_to have_received(:call)
      expect(call).to be_failure
      expect(call[:policy]).to eq(false)
    end
  end

  context "when Api::V1::Issues::MoveForm#success?==false" do
    before do
      allow(Api::V1::Issues::MoveForm)
        .to receive(:call).and_return(double(success?: false))
    end

    it "fails" do
      call

      expect(Issues::MoveMutation).not_to have_received(:call)
      expect(call).to be_failure
      expect(call[:form].success?).to eq(false)
    end
  end
end
