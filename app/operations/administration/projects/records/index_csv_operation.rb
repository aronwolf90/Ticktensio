# frozen_string_literal: true

module Administration
  module Projects
    module Records
      class IndexCsvOperation < AdministrationOperation
        pass ParentStep.new(model: Project, key: :project_id)
        pass IndexParentModelStep.new(relation: :records)
        step Policy::Pundit(RecordPolicy, :index?)
      end
    end
  end
end
