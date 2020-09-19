# frozen_string_literal: true

class IssueLabel < ApplicationRecord
  belongs_to :issue
  belongs_to :label
end
