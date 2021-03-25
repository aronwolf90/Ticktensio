# frozen_string_literal: true

module Api::V1
  module WikiPages
    class UpdateForm < ApiForm
      params do
        required(:data).schema do
          optional(:attributes).schema do
            optional(:title).filled(:string)
            optional(:content).filled(:string)
          end
        end
      end
    end
  end
end
