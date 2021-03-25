# frozen_string_literal: true

module Api::V1
  module BoardLists
    class SortForm < ApiForm
      params do
        required(:data).filled(:array)
      end
    end
  end
end
