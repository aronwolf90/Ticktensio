# frozen_string_literal: true

module Api::V1
  module UserAvatars
    class CreateForm < ApiForm
      params do
        required(:data).schema do
          required(:file).filled(:any)
        end
      end
    end
  end
end
