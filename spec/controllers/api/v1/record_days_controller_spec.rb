# frozen_string_literal: true

require "rails_helper"
require_relative "./shared_examples/standart_actions"

RSpec.describe Api::V1::RecordDaysController, type: :controller do
  let(:model) { RecordDay.new }

  before do
    result = double
    allow(result).to receive(:where).and_return(Kaminari.paginate_array([model]))
    allow(RecordDay).to receive(:ordered).and_return(result)
  end

  include_examples "standard api index action"
end
