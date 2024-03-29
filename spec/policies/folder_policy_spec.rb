# frozen_string_literal: true

require "rails_helper"

describe FolderPolicy do
  subject { described_class }

  permissions :index? do
    it "grant access to the admins" do
      is_expected.to permit(Admin.new, Folder)
    end

    it "grant access to the employees" do
      is_expected.to permit(Employee.new, Folder)
    end

    it "grant access to the customers" do
      is_expected.not_to permit(Customer.new, Folder)
    end
  end

  permissions :new?, :create? do
    it "grant access to the admins" do
      is_expected.to permit(Admin.new, Folder)
    end

    it "grant access to the employees" do
      is_expected.to permit(Employee.new, Folder)
    end

    it "denies access to the customers" do
      is_expected.not_to permit(Customer.new, Folder)
    end
  end

  permissions :edit?, :update? do
    it "grant access to the admins" do
      is_expected.to permit(Admin.new, Folder.new)
    end

    it "grant access to the employees" do
      is_expected.to permit(Employee.new, Folder.new)
    end

    it "denies access to the customers" do
      is_expected.not_to permit(Customer.new, Folder.new)
    end
  end

  permissions :destroy? do
    it "grant access to the admins" do
      is_expected.to permit(Admin.new, Folder.new)
    end

    it "denies access to the employees" do
      is_expected.not_to permit(Employee.new, Folder.new)
    end

    it "denies access to the customers" do
      is_expected.not_to permit(Customer.new, Folder.new)
    end
  end
end
