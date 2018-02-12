# frozen_string_literal: true

require Rails.root.join("lib", "hacks", "knock_devise", "authentificable").to_s

module Api
  module V1
    class ApiController < ApplicationController
      include Knock::Authenticable
      include Hack::KnockDevise::Authenticable

      before_action :authenticate!

      def render_errors(errors)
        render json: OpenStruct.new(errors: OpenStruct.new(messages: errors)), status: :bad_request,
               serializer: ActiveModel::Serializer::ErrorSerializer
      end
    end
  end
end
