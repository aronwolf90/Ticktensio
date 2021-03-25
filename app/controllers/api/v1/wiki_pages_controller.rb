# frozen_string_literal: true

module Api
  module V1
    class WikiPagesController < ApiController
      include StandartActions
      namespace WikiPages
      model_class WikiPage

      public :show, :create, :update, :destroy
    end
  end
end
