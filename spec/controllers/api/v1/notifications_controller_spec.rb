# frozen_string_literal: true

require "rails_helper"

RSpec.describe Api::V1::NotificationsController do
  before { sign_in(Admin.new) }

  it "#index" do
    collection_query = double
    controller.collection_query = collection_query

    expect(collection_query)
      .to receive(:call)
      .with(more_id: nil, per_page: 10)
      .and_return(
        OpenStruct.new(
          collection: [Notification.new(id: 1)],
          has_more: false,
          unread_count: 1
        ))

    get :index
  end
end
