# frozen_string_literal: true

require "rails_helper"

describe Api::V1::AttendanceEvents::CreateForm do
  subject { described_class.call(params) }

  let(:params) do
    {
      data: {
        attributes: {
          "from-day": "1.1.2019",
          "to-day": "1.1.2019",
          "from-time": "09:00",
          "to-time": "18:00",
          "description": "test description"
        },
        relationships: {
          user: {
            data: {
              id: "1",
              type: "admins"
            }
          }
        }
      }
    }
  end

  before do
    allow(Admin).to receive(:exists?).and_return true
  end

  it "form is valid" do
    expect(subject).to be_success
  end

  context "without attributes" do
    before { params[:data].delete(:attributes) }

    it "has an error" do
      expect(subject.errors.to_h).to eq(
        data: { attributes: ["is missing"] }
      )
    end
  end

  context "without from day" do
    before { params[:data][:attributes].delete(:"from-day") }

    it "has an error" do
      expect(subject.errors.to_h).to eq(
        data: { attributes: { "from-day": ["is missing"] } }
      )
    end
  end

  context "without to day" do
    before { params[:data][:attributes].delete(:"to-day") }

    it "return no errors.to_h" do
      expect(subject.errors.to_h).to eq({})
    end
  end

  context "without from time" do
    before { params[:data][:attributes].delete(:"from-time") }

    it "return no errors.to_h" do
      expect(subject.errors.to_h).to eq({})
    end
  end

  context "without to time" do
    before { params[:data][:attributes].delete(:"to-time") }

    it "return no errors.to_h" do
      expect(subject.errors.to_h).to eq({})
    end
  end

  context "without description" do
    before { params[:data][:attributes].delete(:description) }

    it "return no errors.to_h" do
      expect(subject.errors.to_h).to eq({})
    end
  end

  context "without relationships" do
    before { params[:data].delete(:relationships) }

    it "has an error" do
      expect(subject.errors.to_h).to eq(
        data: { relationships: ["is missing"] }
      )
    end
  end

  context "without relationships -> user" do
    before { params[:data][:relationships].delete(:user) }

    it "has an error" do
      expect(subject.errors.to_h).to eq(
        data: { relationships: { user: ["is missing"] } }
      )
    end
  end

  context "without relationships -> user -> data" do
    before { params[:data][:relationships][:user] = {} }

    it "has an error" do
      expect(subject.errors.to_h).to eq(
        data: { relationships: { user: { data: ["is missing"] } } }
      )
    end
  end

  context "without relationships -> user -> data -> id" do
    before { params[:data][:relationships][:user][:data].delete(:id) }

    it "has an error" do
      expect(subject.errors.to_h).to eq(
        data: { relationships: { user: { data: { id: ["is missing"] } } } }
      )
    end
  end
end
