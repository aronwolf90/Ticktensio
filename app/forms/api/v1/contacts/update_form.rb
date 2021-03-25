# frozen_string_literal: true

module Api::V1
  module Contacts
    class UpdateForm < ApiForm
      params do
        required(:data).schema do
          optional(:attributes).schema do
            optional(:kind).filled(:string)
          end
        end
      end
    end
  end
end
