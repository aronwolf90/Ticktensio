# frozen_string_literal: true

module Administration
  module Projects
    module Records
      class IndexOperation < AdministrationOperation
        pass ParentStep.new(model: Project, key: :project_id)
        pass MvcIndexParentModelStep.new(relation: :project_record_days, per: 5)
        pass ThisMonthSpentTimeStep
        step Policy::Pundit(RecordPolicy, :index?)
      end
    end
  end
end
