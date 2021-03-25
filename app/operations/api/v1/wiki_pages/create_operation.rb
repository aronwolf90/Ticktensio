# frozen_string_literal: true

module Api::V1
  module WikiPages
    class CreateOperation < ApiOperation
      @form = CreateForm
      @deserializer = WikiPageDeserializer
      @model = WikiPage
      @policy = WikiPagePolicy
      include StandardCreateOperationConcern
    end
  end
end
