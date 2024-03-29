# frozen_string_literal: true

require "rails_helper"

RSpec.describe Administration::Dashboard::ShowOperation do
  subject { described_class.(params: {}, current_user: user) }

  let(:user) { User.new(worked_issues: [], issues: []) }
  let(:project) { Project.new }

  before do
    allow(Administration::Dashboard::ProjectsStep).to receive(:call) do |options|
      options["model"] = {}
      options["model"][:projects] = { project => 3600.seconds }
    end
  end

  it "model option contain the projects" do
    expect(subject["model"][:projects]).to eq(project => 3600.seconds)
  end
end
