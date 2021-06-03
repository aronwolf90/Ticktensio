# frozen_string_literal: true

class ApplicationMutation
  attr_reader :model
  attr_private :attributes, :user

  def self.call(*args)
    @retries ||= 0
    Rails.logger.debug [self, args]
    new(*args).tap(&:call).model
  rescue ActiveRecord::StatementInvalid
    @retries += 1
    if @retries <= 1
      retry
    else
      raise
    end
  end

  def initialize(model:, user: nil, **attributes)
    @attributes = attributes.except(:current_user).with_indifferent_access
    @user = user
    @model = model
  end
end
