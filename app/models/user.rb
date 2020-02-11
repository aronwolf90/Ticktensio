# frozen_string_literal: true

class User < ApplicationRecord
  mount_uploader :avatar, AvatarUploader

  devise(
    :invitable,
    :database_authenticatable,
    :registerable,
    :invitable,
    :recoverable,
    :rememberable,
    :trackable,
    :validatable
  )

  belongs_to :selected_project, class_name: "Project"
  belongs_to :contact

  has_many :issues
  has_many :records, -> { ordered }
  has_many :record_days, -> { ordered }
  has_one :current_record, -> { active.order(created_at: :desc) },
          class_name: "Record"
  has_many :users
  has_many :user_projects
  has_many :projects, through: :user_projects
  has_many :worked_issues, through: :records, class_name: "Issue",
                           source: :issue
  has_many :notifications

  pg_search_scope(
    :search,
    against: %i[firstname lastname],
    using: { tsearch: { prefix: true } }
  )

  # Knock requires :authenticate
  alias authenticate valid_password?

  def name
    [firstname, lastname].join(" ")
  end

  def to_s
    name
  end

  def active_for_authentication?
    super && active
  end

  def records_count
    records.count
  end
end
