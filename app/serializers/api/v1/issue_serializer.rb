# frozen_string_literal: true

module Api
  module V1
    class IssueSerializer < ApplicationSerializer
      attributes(
        :title,
        :description,
        :complexity,
        :due_at,
        :deadline_at,
        :created_at,
        :status
      )

      belongs_to :created_by, serializer: UserSerializer, type: :users
      belongs_to :user, serializer: UserSerializer
      belongs_to :board_list, serializer: BoardListSerializer
      belongs_to :project, serializer: ProjectSerializer
      has_many :labels, serializer: LabelSerializer

      link(:self) { api_v1_issue_path(object) }

      def due_at
        object.due_at&.strftime("%d-%m-%Y %H:%M")
      end

      def deadline_at
        object.deadline_at&.strftime("%d-%m-%Y %H:%M")
      end

      def created_at
        object.created_at&.strftime("%d-%m-%Y %H:%M")
      end

      def self.eager_load_options
        %i[user created_by labels]
      end
    end
  end
end
