# frozen_string_literal: true

module Administration
  module IssuesHelper
    include AdministrationHelper

    def cancel_btn
      super(%i[administration board_lists])
    end
  end
end
