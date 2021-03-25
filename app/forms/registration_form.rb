# frozen_string_literal: true

class RegistrationForm < ApplicationForm
  model Registration
  property :name
  property :time_zone

  property :firstname
  property :lastname
  property :email
  property :password
  property :confirmation_password, virtual: true
  property :terms_service, virtual: true

  validates :name, presence: true
  validates :time_zone, presence: true
  validates :firstname, presence: true
  validates :lastname, presence: true
  validates :email, presence: true
  validates :password, presence: true
  validates :confirmation_password, presence: true
  validates :terms_service, presence: true

  validate :same_password
  validate :password_length
  validate :uniq_organization_name
  validate :not_allowed_name

  def same_password
    return if confirmation_password == password

    errors.add(:password, "Password is diferent")
  end

  def password_length
    return if password.to_s.size >= 6

    errors.add(:password, "Password is too short")
  end

  def uniq_organization_name
    return unless Organization.exists?(name: organization_name)

    errors.add(:name, "Organization is not uniq")
  end

  def not_allowed_name
    return unless organization_name.in?(Settings.organization_blacklist)

    errors.add(:name, "Use a different name")
  end

  def organization_name
    name&.to_domain
  end
end
