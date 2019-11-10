# frozen_string_literal: true

class ApplicationApi < ActiveModelSerializers::Model
  def self.create(attributes)
    new(attributes).create
  end
end
