# frozen_string_literal: true

module Administration
  class BoardListsController < AdministrationController
    include Concerns::Administration::StandardActions
    side_menu :administration
    namespace BoardLists

    def new
      super
    end

    def create
      super { %i[administration board] }
    end

    def edit
      super
    end

    def update
      super { %i[administration board] }
    end

    def destroy
      super(%i[administration board])
    end
  end
end
