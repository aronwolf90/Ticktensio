# frozen_string_literal: true

require "rails_helper"

RSpec.describe Api::V1::IssueSerializer, type: :serializer do
  let(:issue) do
    build_stubbed(
      :issue,
      due_at: "10-10-2120",
      deadline_at: "10-10-2120",
      created_by: User.new(id: 1),
      created_at: "10-10-2020 10:10:00",
      board_list: BoardList.new(id: 1)
    )
  end
  let(:user) { build_stubbed(:user) }
  let(:project) { Project.new(id: 1) }

  let(:expected_result) do
    {
      data: {
      id: issue.id.to_s,
      type: "issues",
      attributes: {
        title: "title",
        description: "description",
        complexity: nil,
        "due-at": "10-10-2120 00:00",
        "deadline-at": "10-10-2120 00:00",
        "created-at": "10-10-2020 10:10",
        status: :none
      },
      relationships: {
        user: { data: nil },
        labels: {
          data: [{
            id: "1",
            type: "labels"
          }]
        },
        "created-by": {
          data: {
            id: "1",
            type: "users"
          }
        },
        "board-list": {
          data: {
            id: "1",
            type: "board-lists"
          }
        },
        project: {
          data: {
            id: "1",
            type: "projects"
          }
        }
      },
      links: { self: "/api/v1/issues/#{issue.id}" }
    } }
  end

  before do
    allow(issue).to receive(:labels).and_return([Label.new(id: 1)])
    allow(issue).to receive(:project).and_return(project)
  end

  it "serialize record in the correct way" do
    expect(serialize(issue, scope: user)).to eq expected_result
  end
end
