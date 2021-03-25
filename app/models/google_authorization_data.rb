# frozen_string_literal: true

require "dry-struct"

module Types
  include Dry.Types()
end

class GoogleAuthorizationData < Dry::Struct
  attribute :access_token, Types::Strict::String.optional.default(nil)
  attribute :expires_at, Types::Strict::DateTime.optional.default(nil)
  attribute :refresh_token, Types::Strict::String.optional.default(nil)
end
