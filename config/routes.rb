# frozen_string_literal: true

Rails.application.routes.draw do
  root to: redirect("/users/sign_in")

  devise_for :users, controllers: { sessions: "sessions" }

  resources :registrations, only: %i[new create]
  resource :terms, only: :show

  namespace :admin_area do
    root to: "organizations#index"

    resources :organizations, only: :index
  end

  namespace :administration do
    root to: "dashboards#show"

    resource :dashboard, only: :show
    resources :records, except: :show
    resources :board_lists, only: %i[index new create edit update destroy] do
      resources :issues, only: %i[new create]
    end
    resources :issues, only: :show
    resources :attendances, only: :index
    resource :calender, only: :show

    resource :organization, only: %i[edit update]

    resources :users, except: %i[edit create destroy] do
      scope module: :users do
        resource :configuration, only: %i[edit update destroy]
        resources :records, only: :index
      end
    end

    resources :projects do
      scope module: :projects do
        resources :records, only: :index
      end
    end

    resource :wiki, only: :show, controller: :wiki do
      scope module: :wiki do
        resources :categories, except: %i[index show]
        resources :pages, only: %i[show new create]
      end
    end

    resource :archive, only: :show, controller: :archive do
      scope module: :archive do
        resources :folders, except: %i[index show]
        resources :documents, only: %i[new edit]
      end

      get "*path" => redirect("/administration")
    end

    resources :contacts, only: %i[index show new edit]

    namespace :admin do
      resources :payments, only: :index
    end
  end

  namespace :api do
    namespace :v1 do
      resources :user_tokens, only: :create

      resource :context, only: :show

      resources :board_lists, only: %i[index show update destroy] do
        scope module: :board_lists do
          collection do
            resource :sort, only: :update
          end
          resources :issues, only: :index
        end
      end

      resources :issues, only: %i[index show update destroy]
      resources :comments, only: :create

      resources :users, only: %i[index show create update destroy] do
        scope module: :users do
          resource :current_record, only: :show
          resource :configuration, only: :update
        end
      end

      resources :records, only: %i[create update]
      resources :projects, only: :index
      resources :wiki_categories, only: :index
      resources :wiki_pages, only: %i[show update destroy]
      resources :folders, only: :index
      resources :user_issues, only: %i[index show]
      resources :events, only: %i[index create update destroy]
      resources :attendance_days, only: :index
      resources :attendance_events, only: %i[index create update destroy]
      resources :contacts, only: %i[index show create update destroy]
      resources :contact_avatars, only: %i[show create]
      resources :document_files, only: %i[show create update]
      resources :documents, only: %i[index show create update destroy]
      resources :stripe_checkout_sessions, only: :create
      resources :invoices, only: :index
      resource :subscription, only: :show
      resources :notifications, only: :index
      resource :notifications_readed, only: :create
    end
  end
end
