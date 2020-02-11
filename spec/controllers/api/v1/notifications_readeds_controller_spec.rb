# frozen_string_literal: true

require "rails_helper"
require_relative "./shared_examples/standart_actions"

RSpec.describe Api::V1::NotificationsReadedsController, type: :controller do
  let(:params) do
    {
      data: {
        attributes: {
          "reded-at": "17-08-2019 17:00:00"
        }
      }
    }
  end
  let(:user) { Admin.new }

  before { sign_in(user) }

  describe "POST create" do
    it "return 200 status code when operation succeed" do
      controller.operation = double
      expect(controller.operation)
        .to receive(:call)
        .with(params: hash_including(params), current_user: user)
        .and_return(double(success?: true))

      post :create, params: params
      expect(response).to have_http_status(:ok)
    end

    it "return 400 status code when operation fail" do
      controller.operation = double
      result = double(success?: false, errors: ["error"])
      allow(result).to receive(:[]).and_return(["error"])
      expect(controller.operation)
        .to receive(:call)
        .with(params: hash_including(params), current_user: user)
        .and_return(result)

      post :create, params: params
      expect(response).to have_http_status(400)
    end
  end
end
