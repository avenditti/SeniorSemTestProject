Rails.application.routes.draw do
  root 'store#index' , as: 'store_index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :products
end
