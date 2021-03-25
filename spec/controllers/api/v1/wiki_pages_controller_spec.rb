# frozen_string_literal: true

require "rails_helper"
require_relative "./shared_examples/standart_actions"

RSpec.describe Api::V1::WikiPagesController, type: :controller do
  let(:model) { WikiPage.new(id: 1) }

  include_examples "standard api show action"
  include_examples "standard api create action",
                   Api::V1::WikiPages::CreateOperation
  include_examples "standard api update action",
                   Api::V1::WikiPages::UpdateOperation
  include_examples "standard api destroy action"
end
