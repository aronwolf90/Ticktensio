# frozen_string_literal: true

require "rails_helper"
require_relative "../../shared_examples/standard_destroy_operation"

RSpec.describe Administration::ArchiveDocuments::DestroyOperation do
  let(:model) { build_stubbed(:document) }

  it_should_behave_like "standard destroy operation"
end