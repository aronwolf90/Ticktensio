# frozen_string_literal: true

module Events
  class CreateOperation < ApplicationOperation
    pass :mutate
    pass :export

  private
    def mutate(_, model:, attributes:, **)
      StandardCreateMutation.(model: model, **attributes)
    end

    def export(_, organization:, model:, **)
      Events::ExportJob.perform_later(organization, model.id)
    end
  end
end
