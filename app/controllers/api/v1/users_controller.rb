# frozen_string_literal: true

module Api::V1
  class UsersController < ApiController
    include StandartActions
    namespace Users
    model_class User
    serializer UserSerializer

    per_page 10

    public :index, :show, :create, :update

    def destroy
      Api::V1::Users::DestroyOperation.call(
        params: params,
        current_user: current_user
      )
      head :ok
    end
  end
end
