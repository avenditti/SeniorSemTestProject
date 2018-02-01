class StoreController < ApplicationController
	include CurrentCart
	before_action :set_cart, only: [:index]	
  def index
  	@products = Product.order(:popularity).reverse_order
	if session[:counter].nil?
		session[:counter] = 0;
	else
		session[:counter] += 1
		@counter = session[:counter]
	end
	respond_to do |format|
	    format.html {
	        if (params[:spa] && params[:spa] == "true")
	            render 'index_spa'
	        # the else case below is by default
	        # else
	        #    render 'index'
	        end
	    }
	end
  end 
end
