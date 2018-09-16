# frozen_string_literal: true

require "rails_helper"
require_relative "../shared_examples/standart_actions"

RSpec.describe Administration::UsersController, type: :controller do
  let(:model) { build_stubbed(:user, id: 1) }
  let(:form) { Administration::Users::CreateForm }
  let(:params) { {} }

  include_examples "standard index action", Administration::Users
  include_examples "standard new action",
    Administration::Users,
    cell: Administration::Users::Cell::Create
  include_examples "standard create action",
    Administration::Users,
    %i[administration users],
    cell: Administration::Users::Cell::Create
end
