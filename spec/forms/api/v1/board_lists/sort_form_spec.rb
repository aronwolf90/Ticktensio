# frozen_string_literal: true

require "rails_helper"

describe Api::V1::BoardLists::SortForm do
  subject { described_class.call(params) }

  let(:params) do
    {
      data: [1, 2]
    }
  end

  context "board_lists exists" do
    before do
      allow(BoardList).to receive(:find_by).with(id: 1)
                                           .and_return(build_stubbed(:board_list, id: 1))
      allow(BoardList).to receive(:find_by).with(id: 2)
                                           .and_return(build_stubbed(:board_list, id: 2))
    end

    context "with valid params" do
      it "form is valid" do
        expect(subject).to be_success
      end
    end

    context "without data" do
      before { params[:data] = nil }

      it "return an error: data must be filled" do
        expect(subject.errors.to_h).to eq(data: ["must be filled"])
      end
    end
  end
end
