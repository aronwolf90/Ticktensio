# frozen_string_literal: true

module Administration
  module Records
    class DestroyOperation < AdministrationOperation
      step Model(Record, :find)
      step DestroyStep
    end
  end
end
