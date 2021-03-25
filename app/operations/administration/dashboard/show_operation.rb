# frozen_string_literal: true

module Administration
  module Dashboard
    class ShowOperation < ApplicationOperation
      pass ProjectsStep
      pass WorkedIssuesStep
      pass AssignedIssuesStep
      pass :events

      private
        def events(options, params:, **)
          options["model"][:events] =
            Event.all.ordered.page(params[:event_page] || 1).per(5)
        end
    end
  end
end
