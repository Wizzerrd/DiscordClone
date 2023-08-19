Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  post 'api/test', to: 'application#test'

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:show, :create, :update, :destroy]
    resources :servers, only: [:show, :create, :update, :destroy]
    resources :memberships, only: [:create, :show, :destroy]
    resource :session, only: [:show, :create, :destroy]
  end

  get '*path', to: 'static_pages#frontend', constraints: lambda {|req| !req.xhr? && req.format.html?}

  root to: 'static_pages#frontend'

end
