# frozen_string_literal: true

module Api::V1
  module BoardLists
    module Sort
      class UpdateOperation < ApiOperation
        step ValidateStep.new(form: SortForm)
        pass ::BoardLists::SortStep
      end
    end
  end
end
