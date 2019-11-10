# frozen_string_literal: true

RSpec.shared_examples "standard api create action" do |operation|
  describe "PUT udate" do
    subject { post :create }

    let(:user) { User.new }
    let(:params) do
      {
        "controller" => controller.controller_path,
        "action" => "create"
      }
    end

    before do
      allow(result).to receive(:[]).with(:model).and_return(nil)
      allow(result).to receive(:[]).with("model").and_return(nil)
      allow(result).to receive(:[]).with(:parent).and_return(nil)
      allow(result).to receive(:[]).with("contract.default").and_return(nil)
      errors = ActiveModel::Errors.new(nil)
      errors.add(:base, ["ERROR"])
      allow(result).to receive(:[]).with(:errors).and_return(errors)
      sign_in user
    end

    context "valid request" do
      let(:result) { double(success?: true) }

      it "pass collection to render" do
        expect(operation).to receive(:call)
          .with(current_user: user, params: params)
          .and_return(result)
        subject
      end
    end

    context "invalid request" do
      let(:result) { double(success?: false) }

      specify do
        expect(operation).to receive(:call)
          .with(current_user: user, params: params)
          .and_return(result)
        expect(controller).to receive(:render_errors).and_call_original
        subject
      end
    end
  end
end
