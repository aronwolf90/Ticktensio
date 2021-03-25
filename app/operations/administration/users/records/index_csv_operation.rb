# frozen_string_literal: true

module Administration::Users
  module Records
    class IndexCsvOperation < BaseOperation
      pass ParentStep.new(model: User, key: :user_id)
      pass IndexParentModelStep.new(relation: :records)
      step Policy::Pundit(RecordPolicy, :index?)
    end
  end
end
