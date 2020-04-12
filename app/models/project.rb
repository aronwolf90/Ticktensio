# frozen_string_literal: true

class Project < ApplicationRecord
  include PgSearch
  acts_as_paranoid

  has_many :board_lists, dependent: :destroy
  has_many :issues, through: :board_lists
  has_many :records, through: :issues
  has_many :user_projects
  has_many :users, through: :user_projects
  has_many :project_record_days, -> { ordered }
  has_many :project_comments, -> { ordered }
  belongs_to :project_board_list
  has_one :project_status, through: :project_board_list
  has_one :folder
  has_one :contact
  has_many :contacts

  alias_attribute :to_s, :name

  scope :ordered, -> { order(:ordinal_number, :created_at, :id)  }

  pg_search_scope(
    :search,
    against: %i[name],
    using: { tsearch: { prefix: true } }
  )

  def contact_id=(id)
    if id.blank?
      self.contact = nil
    else
      self.contact = Contact.find(id)
    end
  end
end
