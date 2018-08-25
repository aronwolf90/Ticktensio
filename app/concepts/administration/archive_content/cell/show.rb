# frozen_string_literal: true

module Administration
  module ArchiveContent::Cell
    class Show < ApplicationCell
    private

      def add_folder_btn
        add_btn(
          model_class: Folder,
          path: %i[new administration archive folder]
        )
      end

      def add_document_btn
        add_btn(
          model_class: Document,
          path: %i[new administration archive document]
        )
      end
    end
  end
end
