module Api
  module V1
    class CommentSerializer < ActiveModel::Serializer
      attributes :issue_id, :content
    end
  end
end