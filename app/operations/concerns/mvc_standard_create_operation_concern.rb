# frozen_string_literal: true

module MvcStandardCreateOperationConcern
  extend ActiveSupport::Concern

  included do |base|
    pass base::Nested(base.module_parent::NewOperation)
    pass MvcInjectStep.new(:current_user)
    step base::Contract::Validate(key: :data)
    pass MvcCreateMutationStep
  end
end
