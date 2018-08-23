# frozen_string_literal: true

require "rails_helper"

RSpec.describe Api::V1::Issues::UpdateOperation do
  subject do
    described_class.(params: params, current_user: user)
  end

  let(:user) { build_stubbed(:admin) }
  let(:issue) { build_stubbed(:issue) }
  let(:params) do
    {
      data: {
        attributes: {
          title: "title",
          description: "description"
        },
        relationships: {
          user: { data: { id: 1, type: "users" } }
        }
      }
    }
  end
  let(:form_result) { OpenStruct.new(errors: []) }
  let(:deserialized_params) do
    {
      title: "title",
      description: "description",
      complexity: "0.5",
      user_id: 1
    }
  end

  before do
    allow(Issue).to receive(:find).and_return(issue)
    allow(Api::V1::Issues::UpdateForm).to receive(:call).with(params).and_return(form_result)
    allow(Api::V1::IssueDeserializer).to receive(:call).with(params[:data]).and_return(deserialized_params)
    allow(issue).to receive(:update!)
  end

  it "call update!" do
    expect(issue).to receive(:update!).with(deserialized_params)
    subject
  end

  it { is_expected.to be_success }

  context "invalid params" do
    before do
      params[:data][:relationships][:user][:data][:id] = nil
      form_result.errors = { data: { relationships: {
        "issues": { data: { 0 => { id: ["must be filled"] } } }
      } } }
    end

    it "not call update!" do
      expect(issue).not_to receive(:update!).with(deserialized_params)
    end

    it { is_expected.not_to be_success }
  end
end
