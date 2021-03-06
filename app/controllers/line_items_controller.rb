class LineItemsController < ApplicationController
  skip_before_action :verify_authenticity_token
  include CurrentCart
  before_action :set_cart, only: [:create] 
  before_action :set_line_item, only: [:show, :edit, :update, :destroy]
  def pundit_user
 current_account
 end
  # GET /line_items
  # GET /line_items.json
  def index
    @line_items = LineItem.all
  end

  # GET /line_items/1
  # GET /line_items/1.json
  def show
  end

  # GET /line_items/new
  def new
    @line_item = LineItem.new
  end

  # GET /line_items/1/edit
  def edit
  end

  def show_orders_for_seller

    seller = Seller.find(params[:id])
    authorize seller, :show_orders_for_seller?
    products = seller.products
    @line_items = LineItem.where(product_id: products)
    products.each do |product|
      logger.info(product)
    end
  end 

  # POST /line_items
  # POST /line_items.json
  def create
    product = Product.find(params[:product_id])
    @line_item = @cart.add_product(product)
    session[:counter] = 0
    product.popularity = product.popularity + 1
    product.update_attributes(:popularity => product.popularity)
    # @line_item = @cart.line_items.build(product: product)
    if !session[:spa]
      @products = Product.all
      ActionCable.server.broadcast 'products',
      html: render_to_string('store/index', layout: false)
    end
    respond_to do |format|
      if @line_item.save
        format.html { redirect_to store_index_url }
        format.js { @current_item = @line_item }
        format.json { }  
      else
        format.html { render :new }
        format.json { render json: @line_item.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /line_items/1
  # PATCH/PUT /line_items/1.json
  def update
    respond_to do |format|
      if @line_item.update(line_item_params)
        format.html { redirect_to @line_item, notice: 'Line item was successfully updated.' }
        format.json { render :show, status: :ok, location: @line_item }
      else
        format.html { render :edit }
        format.json { render json: @line_item.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /line_items/1
  # DELETE /line_items/1.json
  def destroy
    @line_item.destroy
    respond_to do |format|
      format.html { redirect_to @line_item.cart, notice: 'Line item was successfully destroyed.' }
      format.json { }
    end
  end

  def decrement
    line_item = LineItem.find_by_id(params[:id])
    @cart = line_item.cart
    if line_item.quantity - 1 == 0  
      line_item.destroy
      if line_item.cart.line_items.size == 0
        @cart.destroy
      end
    else
      line_item.quantity -= 1
      line_item.update_attributes(:quantity => line_item.quantity)
    end
    line_item.product.popularity -= 1
    line_item.product.update_attributes(:popularity => line_item.product.popularity)
    if !session[:spa]
      @products = Product.all
      ActionCable.server.broadcast 'products',
      html: render_to_string('store/index', layout: false)
    end
    respond_to do |format|
      format.html { redirect_to store_index_url, notice: 'Item Removed' }
      format.js { @current_item = @line_item }
      format.json { }

    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_line_item
      @line_item = LineItem.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def line_item_params
      params.require(:line_item).permit(:product_id)
    end
end
