Rails.application.routes.draw do
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
end
