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
        :operation,
        :update_operation,
        :create_operation,
        :destroy_operation
      )

      after_action do
        cookies[:csrf_token] = helpers.form_authenticity_token
      end

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

        def self.update_operation(value, **args)
          before_action -> { @update_operation ||= value  }, **args
        end

        def self.create_operation(value, **args)
          before_action -> { @create_operation ||= value  }, **args
        end

        def self.destroy_operation(value, **args)
          before_action -> { @destroy_operation ||= value  }, **args
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
