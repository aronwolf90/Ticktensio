# frozen_string_literal: true

require "rails_helper"

describe LabelPolicy do
  subject { described_class }

  permissions :index? do
    it "grant access to the admins" do
      is_expected.to permit(Admin.new, Label)
    end

    it "grant access to the employees" do
      is_expected.to permit(Employee.new, Label)
    end

    it "grant access to the customers" do
      is_expected.not_to permit(Customer.new, Label)
    end
  end

  permissions :new?, :create? do
    it "grant access to the admins" do
      is_expected.to permit(Admin.new, Label)
    end

    it "grant access to the employees" do
      is_expected.to permit(Employee.new, Label)
    end

    it "denies access to the customers" do
      is_expected.not_to permit(Customer.new, Label)
    end
  end

  permissions :edit?, :update? do
    it "grant access to the admins" do
      is_expected.to permit(Admin.new, Label.new)
    end

    it "grant access to the employees" do
      is_expected.to permit(Employee.new, Label.new)
    end

    it "denies access to the customers" do
      is_expected.not_to permit(Customer.new, Label.new)
    end
  end

  permissions :destroy? do
    it "grant access to the admins" do
      is_expected.to permit(Admin.new, Label.new)
    end

    it "denies access to the employees" do
      is_expected.to permit(Employee.new, Label.new)
    end

    it "denies access to the customers" do
      is_expected.not_to permit(Customer.new, Label.new)
    end
  end
end
