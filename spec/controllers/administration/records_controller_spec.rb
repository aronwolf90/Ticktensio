# frozen_string_literal: true

require "rails_helper"
require_relative "../shared_examples/standart_actions"

RSpec.describe Administration::RecordsController, type: :controller do
  let(:model) { Record.new(id: 1) }
  let(:form) { Administration::RecordForm }
  let(:params) { {} }

  include_examples "standard csv index action", Administration::Records
end
