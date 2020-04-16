# frozen_string_literal: true

module Api
  module V1
    module StandartActions
      extend ActiveSupport::Concern

      protected
        def index
          authorize model_class, :index? if model_class.present?

          render_json_api json: query
        rescue Pundit::NotAuthorizedError
          head :forbidden
        end

        def show
          authorize model, :show? if model.present?

          return head :ok if model.nil? # TODO: change this with a 404 error
          render_json_api json: model, links: false
        rescue Pundit::NotAuthorizedError
          head :forbidden
        end

        def create
          result = run namespace::CreateOperation

          if result.success?
            render json: serializer.new(result[:model]).serialized_json, status: :created
          else
            render_errors(result[:errors])
          end
        end

        def update
          result = run namespace::UpdateOperation

          if result.success?
            head :no_content
          else
            render_errors(result[:errors])
          end
        end

        def destroy
          authorize model, :destroy? if model.present?

          model.destroy!

          head :ok
        rescue Pundit::NotAuthorizedError
          head :forbidden
        end

        def render_json_api(json:, links: true)
          render json: serializer.new(json,
            {
              include: params[:include],
              links: ({ self: request.path_info } if links),
              params: { current_user: current_user }
            }).serialized_json
        end

        def query
          JsonApiQuery.call(
            model_class.all.ordered.includes(serializer.eager_load_options),
            params.to_unsafe_h.deep_symbolize_keys
          )
        end

        def model
          @model ||= model_class.find(id)
        end

        def scope
          {}
        end

        def id
          if params[:id]&.include? ","
            params[:id].split(",")
          else
            params[:id]
          end
        end
    end
  end
end
