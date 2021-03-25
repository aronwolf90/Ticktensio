# frozen_string_literal: true

module Api
  module V1
    module StandartActions
      extend ActiveSupport::Concern

      protected
        def index
          authorize model_class, :index? if model_class.present?
          page = (params[:page] || 1).to_i
          per_page = per_page() || 10

          render_json_api json: query.offset(per_page * (page - 1)).limit(per_page), meta: {
            count: query.count
          }.merge(index_meta)
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
            render json: result[:model], status: :created
          else
            render_errors(result[:errors].to_h)
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

        def render_json_api(json:, links: true, meta: {})
          serializer_hash =
            if json.is_a?(Array) || json.is_a?(ActiveRecord::Relation)
              { each_serializer: serializer }
            else
              { serializer: serializer }
            end

          render({
            json: json,
            include: params[:include],
            links: ({ self: request.path_info } if links),
            filter: params[:filter] || {},
            meta: meta
          }.merge(serializer_hash))
        end

        def query
          JsonApiQuery.call(
            model_class.all.includes(serializer.eager_load_options),
            params.to_unsafe_h.deep_symbolize_keys.merge(include: includes)
          )
        end

        def model
          @model ||= model_class.find(id)
        end

        def scope
          {}
        end

        def index_meta
          {}
        end

        def id
          if params[:id]&.include? ","
            params[:id].split(",")
          else
            params[:id]
          end
        end

        def includes
          includes = params[:include].is_a?(Array) ? params[:include].join(",") : params[:include].to_s
          includes.split(",")
        end
    end
  end
end
