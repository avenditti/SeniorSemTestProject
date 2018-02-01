class StoreController < ApplicationController
	include CurrentCart
	before_action :set_cart, only: [:index]	
  def index
  	@products = Product.order(:popularity)
	if session[:counter].nil?
		session[:counter] = 0;
	else
		session[:counter] += 1
		@counter = session[:counter]
	end
  end
end
