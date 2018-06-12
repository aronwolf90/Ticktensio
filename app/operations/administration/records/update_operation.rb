# frozen_string_literal: true

module Administration
  module Records
    class UpdateOperation < AdministrationOperation
      @form = RecordForm
      @mutation = ::Records::UpdateMutation

      include StandardUpdateOperationConcern
    end
  end
end
