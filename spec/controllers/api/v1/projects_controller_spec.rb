# frozen_string_literal: true

require "rails_helper"
require_relative "./shared_examples/standart_actions"

RSpec.describe Api::V1::ProjectsController, type: :controller do
  let(:model) { Project.new(id: 1) }

  include_examples "standard api show action"
  include_examples "standard api index action"
end
