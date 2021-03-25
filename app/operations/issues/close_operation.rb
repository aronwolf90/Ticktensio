# frozen_string_literal: true

module Issues
  class CloseOperation < ApplicationOperation
    pass :close

  private
    def close(options, model:, **)
      Issues::CloseMutation.call(model: model)
    end
  end
end
