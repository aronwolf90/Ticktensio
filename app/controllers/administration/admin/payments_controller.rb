# frozen_string_literal: true

module Administration
  module Admin
    class PaymentsController < AdministrationController
      side_menu "administration/organization"
      namespace Administration::Admin::Payments

      public :index
    end
  end
end
