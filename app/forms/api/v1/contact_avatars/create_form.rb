# frozen_string_literal: true

module Api::V1
  module ContactAvatars
    class CreateForm < ApiForm
      params do
        required(:data).schema do
          required(:file).filled(:any)
        end
      end
    end
  end
end
