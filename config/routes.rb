# frozen_string_literal: true

Rails.application.routes.draw do
  defaults format: :json do
    resources :categories, only: %i[index create update destroy]
    resources :articles, only: %i[index create destroy update]
    resource :site, only: %i[show update]
  end
  root "home#index"
  get "*path", to: "home#index", via: :all
end
