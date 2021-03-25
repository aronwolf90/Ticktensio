# frozen_string_literal: true

class ApplicationForm < Reform::Form
  def call(*args)
    validate(*args)
    self
  end

  def success?
    errors.none?
  end
end
