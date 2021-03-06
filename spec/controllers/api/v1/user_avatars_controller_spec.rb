# frozen_string_literal: true

require "rails_helper"
require_relative "./shared_examples/standart_actions"

RSpec.describe Api::V1::UserAvatarsController, type: :controller do
  let(:model) { ContactAvatar.new(id: 1) }

  include_examples "standard api create action",
                   Api::V1::UserAvatars::CreateOperation

  describe "#show" do
    let(:user_avatar_path) do
      Rails.root.join("spec", "fixtures", "avatar.png")
    end
    let(:user_avatar) { build_stubbed(:user_avatar, file: File.open(user_avatar_path)) }
    let(:user) { build_stubbed(:user) }

    before do
      sign_in(user)
      allow(UserAvatar)
        .to receive(:find_by).and_return(user_avatar)
    end

    context "when the contact avatar exists" do
      specify do
        expect(controller).to receive(:send_file) do
          controller.head :ok
        end
        get :show, params: { id: user_avatar.id }
      end
    end

    context "when the contact avatar exists" do
      let(:user_avatar) { nil }

      specify do
        expect(controller).to receive(:send_file) do
          controller.head :ok
        end
        get :show, params: { id: "placeholder" }
      end
    end
  end
end
