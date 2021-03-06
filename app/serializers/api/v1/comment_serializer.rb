# frozen_string_literal: true

module Api
  module V1
    class CommentSerializer < ApplicationSerializer
      attributes :content

      belongs_to :issue, serializer: IssueSerializer
      belongs_to :user, serializer: UserSerializer
    end
  end
end
