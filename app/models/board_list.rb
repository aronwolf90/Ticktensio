# frozen_string_literal: true

class BoardList < ApplicationRecord
  acts_as_paranoid

  has_many :issues, (lambda do
    order("issues.ordinal_number ASC NULLS LAST").order(created_at: :desc)
  end), dependent: :destroy

  belongs_to :project

  scope :ordered, -> { order(:ordinal_number, :id) }

  accepts_nested_attributes_for :issues
end
