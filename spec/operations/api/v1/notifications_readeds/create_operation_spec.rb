# frozen_string_literal: true

require "rails_helper"
require_relative "../shared_examples/standard_operations"

RSpec.describe Api::V1::NotificationsReadeds::CreateOperation do
  subject  do
    described_class.call(
      params: { data: double },
      current_user: current_user
    )
  end

  let(:current_user) { double }

  it "succeed when all is correct" do
    expect(Api::V1::NotificationsReadeds::CreateForm)
      .to receive(:call)
      .and_return(double(errors: []))
    expect(Api::V1::NotificationsReadedDeserializer)
      .to receive(:normalize)
      .and_return(readed_at: "15-01-2019 17:00:00")
    expect(NotificationsReadeds::CreateMutation)
      .to receive(:call)
      .with(user: current_user, readed_at: "15-01-2019 17:00:00")
    expect(subject).to be_success
  end

  it "fail when form returns errors" do
    expect(Api::V1::NotificationsReadeds::CreateForm)
      .to receive(:call)
      .and_return(double(errors: ["error"]))
    expect(NotificationsReadeds::CreateMutation)
      .not_to receive(:call)
    expect(subject).to be_failure
  end
end
