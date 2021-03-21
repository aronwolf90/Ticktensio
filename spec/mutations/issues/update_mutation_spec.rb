# frozen_string_literal: true

require "rails_helper"

RSpec.describe Issues::UpdateMutation do
  subject do
    described_class.call(
      user: current_user,
      model: model,
      board_list_id: params_board_list_id,
      ordinal_number: ordinal_number
    )
  end

  let(:project) { create(:project) }
  let(:board_list) { create(:board_list, project: project) }
  let(:global_board_list) { create(:board_list, project: nil) }
  let(:current_user) { create(:employee) }
  let(:params_board_list_id) { board_list.id }
  let(:model) do
    create(
      :issue,
      ordinal_number: 1,
      global_ordinal_number: 1,
      board_list: board_list,
      global_board_list: global_board_list
    )
  end
  let(:ordinal_number) { 3 }
  let!(:issue1) do
    create(
      :issue,
      ordinal_number: 2,
      global_ordinal_number: 2,
      board_list: board_list,
      global_board_list: global_board_list
    )
  end
  let!(:issue2) do
    create(
      :issue,
      ordinal_number: 3,
      global_ordinal_number: 3,
      board_list: board_list,
      global_board_list: global_board_list,
      created_at: 2.day.ago
    )
  end

  context "when the board_list is a project specific one"  do
    before { allow(Organization).to receive(:global_board?).and_return false }

    it "set ordinal_number on project specific board" do
      expect(subject.reload.board_list.issues.order(:id))
        .to eq([issue1, issue2, subject])
      expect(subject.ordinal_number).to eq(3)
    end
  end

  context "when the board_list is a global one and global_ordinal_number == ordinal_number"  do
    before { allow(Organization).to receive(:global_board?).and_return true }

    let(:params_board_list_id) { global_board_list.id }

    it "set global_ordinal_number correctly" do
      expect(subject.reload.global_board_list.issues.order(:id))
        .to eq([issue1, issue2, subject])
      expect(subject.global_ordinal_number).to eq(3)
    end
  end

  context "when global_board?==true and global_ordinal_number != ordinal_number"  do
    let(:params_board_list_id) { global_board_list.id }

    before do
      allow(Organization).to receive(:global_board?).and_return true
      issue1.update!(ordinal_number: 2)
      issue2.update!(ordinal_number: 1)
      model.update!(ordinal_number: 0)
    end

    it "set global_ordinal_number correctly" do
      subject
      expect(issue1.reload.global_ordinal_number).to eq(0)
      expect(issue2.reload.global_ordinal_number).to eq(1)
      expect(model.reload.global_ordinal_number).to eq(3)
    end
  end

  context "when change board_list and global_board?==false" do
    let(:model) do
      create(:issue, ordinal_number: 1, board_list: create(:board_list))
    end

    before { allow(Organization).to receive(:global_board?).and_return false }

    specify do
      expect(subject.reload.board_list.issues.ordered)
        .to eq([issue1, issue2, subject])
      expect(subject.ordinal_number).to eq(3)
    end
  end

  context "when change board_list and global_board?=true" do
    let(:model) do
      create(
        :issue,
        global_ordinal_number: 1,
        global_board_list: create(:board_list)
      )
    end
    let(:params_board_list_id) { global_board_list.id }

    before do
      allow(Organization).to receive(:global_board?).and_return true
    end

    specify do
      expect(subject.reload.global_board_list.issues.ordered)
        .to eq([issue1, issue2, subject])
      expect(subject.global_ordinal_number).to eq(3)
    end
  end

  context "when the board_list is a project specific and kind==closed" do
    let!(:closed_board_list) do
      create(:board_list, project: project, kind: :closed)
    end
    let!(:closed_global_board_list) do
      create(:board_list, project: nil, kind: :closed)
    end
    let(:params_board_list_id) { closed_board_list.id }

    before { allow(Organization).to receive(:global_board?).and_return false }

    it "sets global_board_list_id to one that has kind==closed" do
      subject
      expect(model.global_board_list).to eq(closed_global_board_list)
    end
  end

  context "when the board_list is a global one and kind==closed" do
    let!(:closed_board_list) do
      create(:board_list, project: project, kind: :closed)
    end
    let!(:closed_global_board_list) do
      create(:board_list, project: nil, kind: :closed)
    end
    let(:params_board_list_id) { closed_global_board_list.id }

    before { allow(Organization).to receive(:global_board?).and_return true }

    it "sets global_board_list_id to one that has kind==closed" do
      subject
      expect(model.board_list).to eq(closed_board_list)
    end
  end

  context "with project_id" do
    subject do
      described_class.call(
        user: current_user,
        model: model,
        board_list_id: params_board_list_id,
        ordinal_number: ordinal_number,
        project_id: project_id
      )
    end

    context "when project_id==issue.project.id" do
      let(:project_id) { project.id }

      it "does nothing" do
        subject
        expect(model.project).to eq(project)
      end
    end

    context "when project_id!=issue.project.id" do
      let(:other_project) { create(:project) }
      let(:project_id) { other_project.id }
      let(:board_list) { create(:board_list, project: other_project) }

      it "does nothing" do
        subject
        expect(model.reload.project).to eq(other_project)
      end
    end
  end
end
