# frozen_string_literal: true

module Administration
  module Users::Cell
    class Form < Trailblazer::Cell
      include ActionView::RecordIdentifier
      include ActionView::Helpers::FormOptionsHelper
      include SimpleForm::ActionViewExtensions::FormHelper

    private

      def cancel_path
        %i[administration users]
      end
    end
  end
end
