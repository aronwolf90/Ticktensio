# frozen_string_literal: true

module Api::V1
  module Folders
    class CreateForm < ApiForm
      params do
        required(:data).schema do
          required(:attributes).schema do
            required(:name).filled(:string)
          end
        end
      end
    end
  end
end
