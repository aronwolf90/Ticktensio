# frozen_string_literal: true

require "rails_helper"

describe Api::V1::Issues::MoveForm do
  subject { described_class.call(params) }

  let(:params) do
    {
      issue_id: "1",
      before_issue_id: "2",
      board_list_id: "1"
    }
  end

  it "form is valid" do
    expect(subject).to be_success
  end

  it "is invalid when issue_id is blank" do
    params[:issue_id] = nil

    expect(subject).to be_failure
  end

  it "is invalid when board_list_id is blank" do
    params[:board_list_id] = nil

    expect(subject).to be_failure
  end
end
