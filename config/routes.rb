Rails.application.routes.draw do
  namespace :admin do
    resources :accounts
    resources :buyers
    resources :carts
    resources :line_items
    resources :orders
    resources :products
    resources :sellers
    resources :super_accounts
    root to: "accounts#index"
  end

  devise_for :accounts, :controllers => { :registrations => 'registrations' }
  resources :orders
  resources :line_items
  resources :carts
  root 'store#index' , as: 'store_index'
  mount ActionCable.server => '/cable'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :products
  get 'search', to: 'store#search'
  resources :line_items do
  	member do
  		patch 'decrement'
  	end
  end

  resources :sellers do
    resources :products
    member do
      get 'orders', to: 'line_items#show_orders_for_seller'
    end
  end
  resources :buyers do
    resources :orders
  end
  resources :buyers, only: [:edit, :update]
  resources :sellers, only: [:edit, :update]
end
