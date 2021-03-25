# frozen_string_literal: true

module Registrations
  class CreateOperation < ApplicationOperation
    pass Nested(Registrations::NewOperation)
    pass MvcInjectStep.new(:current_user)
    step Contract::Validate(key: :data)
    step :check_recaptcha
    pass MvcCreateMutationStep
    pass :send_wellcome_email

  private
    def check_recaptcha(_, recaptcha:, **)
      recaptcha
    end

    def send_wellcome_email(ctx, model:, **)
      OrganizationMailer
        .with(user_id: model.user.id, organization: model.organization)
        .wellcome
        .deliver_later
    end
  end
end
