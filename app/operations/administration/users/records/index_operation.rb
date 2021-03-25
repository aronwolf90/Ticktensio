# frozen_string_literal: true

module Administration::Users
  module Records
    class IndexOperation < BaseOperation
      pass ParentStep.new(model: User, key: :user_id)
      pass MvcIndexParentModelStep.new(relation: :record_days, per: 5)
      step Policy::Pundit(RecordPolicy, :index?)
      pass IndexMonthTimeStep
    end
  end
end
