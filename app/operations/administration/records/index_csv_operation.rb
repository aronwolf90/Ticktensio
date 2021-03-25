# frozen_string_literal: true

module Administration
  module Records
    class IndexCsvOperation < AdministrationOperation
      pass :model
      step Policy::Pundit(RecordPolicy, :index?)

      def model(options, current_user:, **)
        options[:model] = current_user.records
      end
    end
  end
end
