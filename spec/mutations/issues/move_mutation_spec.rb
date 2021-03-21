# frozen_string_literal: true

require "rails_helper"

RSpec.describe Issues::MoveMutation do
  subject(:call) do
    described_class.call(
      issue: issue,
      before_issue: before_issue,
      board_list: board_list,
      project: project
    )
  end
  let(:board_list2) { create(:board_list) }
  let(:global_board_list1) { create(:board_list) }
  let(:project) { nil }

  context "when board is a project specific one" do
    let(:board_list) { create(:board_list, project: create(:project)) }

    context "when the board list does not change" do
      let!(:issue) { create(:issue, board_list: board_list, global_board_list: global_board_list1) }

      context "when before_issue == nil" do
        let(:before_issue) { nil }
        let!(:issue2) { create(:issue, board_list: board_list, global_board_list: global_board_list1) }

        it "orders the issues, set issue ordinal_number==0 and global_ordinal_number==0" do
          call

          expect(issue.board_list).to eq(board_list)
          expect(issue.reload.ordinal_number).to eq(0)
          expect(issue.reload.global_ordinal_number).to eq(0)
          expect(issue2.reload.ordinal_number).to eq(1)
          expect(issue2.reload.global_ordinal_number).to eq(1)
        end
      end

      context "when before_issue is on bouth board_lists" do
        let(:before_issue) { issue2 }
        let!(:issue) { create(:issue, board_list: board_list, global_board_list: global_board_list1) }
        let!(:issue2) { create(:issue, board_list: board_list, global_board_list: global_board_list1) }

        it "orders the issues, set issue ordinal_number==1 and global_ordinal_number==1" do
          call

          expect(issue.board_list).to eq(board_list)
          expect(issue.reload.ordinal_number).to eq(1)
          expect(issue.reload.global_ordinal_number).to eq(1)
          expect(issue2.reload.ordinal_number).to eq(0)
          expect(issue2.reload.global_ordinal_number).to eq(0)
        end
      end

      context "when before_issue is only on the project specifc board list" do
        let(:before_issue) { issue2 }
        let!(:issue) { create(:issue, board_list: board_list, global_board_list: global_board_list1) }
        let!(:issue2) { create(:issue, board_list: board_list, global_board_list: global_board_list2) }
        let(:global_board_list2) { create(:board_list) }

        it "orders the issues and set issue ordinal_number==1" do
          call

          expect(issue.board_list).to eq(board_list)
          expect(issue.reload.ordinal_number).to eq(1)
          expect(issue.reload.global_ordinal_number).to eq(nil)
          expect(issue2.reload.ordinal_number).to eq(0)
          expect(issue2.reload.global_ordinal_number).to eq(nil)
        end
      end

      context "when before_issue is only on the project board list" do
        let(:before_issue) { issue2 }
        let!(:issue) { create(:issue, board_list: board_list, global_board_list: global_board_list1) }
        let!(:issue2) { create(:issue, board_list: board_list2, global_board_list: global_board_list1) }
        let(:board_list2) { create(:board_list) }

        it "orders the issues and set global_ordinal_number==1" do
          call

          expect(issue.board_list).to eq(board_list)
          expect(issue.reload.ordinal_number).to eq(0)
          expect(issue.reload.global_ordinal_number).to eq(1)
          expect(issue2.reload.ordinal_number).to eq(0)
          expect(issue2.reload.global_ordinal_number).to eq(0)
        end
      end
    end

    context "when board list is a project specific one and board_list!=issue.board_list" do
      let!(:issue) { create(:issue, board_list: board_list2, global_board_list: global_board_list1) }

      context "when before_issue == nil" do
        let(:before_issue) { nil }
        let!(:issue2) { create(:issue, board_list: board_list, global_board_list: global_board_list1) }

        it "orders the issues, set issue ordinal_number==0 and global_ordinal_number==0" do
          call

          expect(issue.board_list).to eq(board_list)
          expect(issue.reload.ordinal_number).to eq(0)
          expect(issue.reload.global_ordinal_number).to eq(0)
          expect(issue2.reload.ordinal_number).to eq(1)
          expect(issue2.reload.global_ordinal_number).to eq(1)
        end
      end
    end
  end

  context "when board_list is a global one" do
    let(:board_list) { create(:board_list, project: nil) }

    context "when board_list!=issue.global_board_list" do
      let!(:issue) { create(:issue, board_list: project_board_list, global_board_list: global_board_list) }
      let(:project_board_list) { create(:board_list) }
      let(:global_board_list) { create(:board_list) }

      context "when before_issue == nil" do
        let(:before_issue) { nil }
        let!(:issue2) { create(:issue, board_list: project_board_list, global_board_list: board_list) }

        it "orders the issues, set issue ordinal_number==0 and global_ordinal_number==0" do
          call

          expect(issue.global_board_list).to eq(board_list)
          expect(issue.reload.ordinal_number).to eq(0)
          expect(issue.reload.global_ordinal_number).to eq(0)
          expect(issue2.reload.ordinal_number).to eq(1)
          expect(issue2.reload.global_ordinal_number).to eq(1)
        end
      end
    end
  end

  context "when project is present and board_list is nil" do
    let(:board_list) { nil }
    let(:project) { create(:project) }
    let(:before_issue) { nil }
    let!(:project_board_list) { create(:board_list, project: project) }
    let!(:global_board_list) { create(:board_list, project: nil) }
    let!(:issue) do
      create(
        :issue,
        board_list: create(:board_list),
        global_board_list: global_board_list
      )
    end

    it "set project specific board_list" do
      call

      expect(issue.global_board_list).to eq(global_board_list)
      expect(issue.reload.ordinal_number).to eq(0)
      expect(issue.reload.global_ordinal_number).to eq(0)
      expect(issue.project).to eq(project)
    end
  end
end
