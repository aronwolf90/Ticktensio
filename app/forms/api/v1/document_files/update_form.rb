# frozen_string_literal: true

module Api::V1
  module DocumentFiles
    class UpdateForm < ApiForm
      params do
        required(:data).schema do
          required(:file).filled(:any)
          optional(:not_finished).filled(:bool)
        end
      end
    end
  end
end
