# frozen_string_literal: true

require Rails.root.join("lib", "hacks", "knock_devise", "authentificable").to_s

module Api
  module V1
    class ApiController < ApplicationController
      include Knock::Authenticable
      include Hack::KnockDevise::Authenticable
      include ActionController::Serialization
      before_action :authenticate!
      serialization_scope :view_context

      attr_accessor(
        :model_class,
        :per_page,
        :serializer,
        :collection_query,
        :operation
      )

      private
        def render_errors(errors)
          render json: Api::ErrorSerializer.(errors),
                 status: :bad_request
        end

        def self.model_class(model_class, **args)
          before_action -> { @model_class = model_class }, **args
        end

        def self.per_page(value, **args)
          before_action -> { @per_page = value }, **args
        end

        def self.serializer(value, **args)
          before_action -> { @serializer ||= value }, **args
        end

        def self.collection_query(value, **args)
          before_action -> { @collection_query ||= value  }, **args
        end

        def self.operation(value, **args)
          before_action -> { @operation ||= value  }, **args
        end

        def serializer
          @serializer || "Api::V1::#{model_class}Serializer".constantize
        end

        def next_more_id
          collection_result.collection.last.id
        end
    end
  end
end
