# frozen_string_literal: true

module Administration
  class RecordsController < AdministrationController
    include RecordsControllerConcern
    side_menu :administration
    namespace Administration::Records

    public :index, :new, :edit, :create, :update, :destroy
  end
end
