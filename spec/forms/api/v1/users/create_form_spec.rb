# frozen_string_literal: true

require "rails_helper"

describe Api::V1::Users::CreateForm do
  subject { described_class.call(params) }

  let(:params) do
    {
      data: {
        id: "1",
        type: "users",
        attributes: {
          firstname: "Lara",
          lastname: "Croft",
          email: "test@lvh.me",
          type: "Admin"
        }
      }
    }
  end

  context "with valid params" do
    it { is_expected.to be_success }
  end

  context "when firstname is nil" do
    before { params[:data][:attributes][:firstname] = nil  }

    it { is_expected.to be_failure }
  end

  context "when lastname is nil" do
    before { params[:data][:attributes][:lastname] = nil  }

    it { is_expected.to be_failure }
  end

  context "when email is nil" do
    before { params[:data][:attributes][:email] = nil  }

    it { is_expected.to be_failure }
  end

  context "when type is nil" do
    before { params[:data][:attributes][:type] = nil  }

    it { is_expected.to be_failure }
  end

  context "when email already exist" do
    before { create(:admin, email: "test@lvh.me")  }

    it { is_expected.to be_failure }
  end
end
