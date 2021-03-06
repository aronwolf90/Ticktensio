# frozen_string_literal: true

module Api
  module V1
    class UserSerializer < ApplicationSerializer
      type "users"

      attribute :firstname
      attribute :lastname
      attribute :email
      attribute :type
      attribute :active
      attribute :records_count
      attribute :avatar_url
      attribute :telephone_number

      belongs_to :selected_project, serializer: ProjectSerializer, type: :projects

      has_many :issues, serializer: IssueSerializer
      has_one :current_record, serializer: RecordSerializer, type: :records

      link(:self) { api_v1_user_path(object) }

      def avatar_url
        id = object.user_avatar_id || "placeholder"
        api_v1_user_avatar_path(id: id)
      end

      def self.eager_load_options
        %i[issues current_record selected_project]
      end
    end
  end
end
