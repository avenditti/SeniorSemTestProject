class SellersController < ApplicationController
 before_action :set_buyer, only: [:edit, :update]
 before_action :authenticate_account!
 # GET /buyers/1/edit
  def pundit_user
 current_account
 end
 def edit
 	authorize @seller
 end
 # PATCH/PUT /buyers/1
 # PATCH/PUT /buyers/1.json
 def update
 	authorize @seller
 respond_to do |format|
 if @seller.update(seller_params)
 format.html { redirect_to store_index_url, notice: "The profile of the seller #{@seller.name} was successfully updated." }
 format.json { head :no_content }
 else
 format.html { render action: 'edit' }
 format.json { render json: @seller.errors, status: :unprocessable_entity }
 end
 end
 end
 private
 # Use callbacks to share common setup or constraints between actions.
 def set_buyer
 @seller = Seller.find(params[:id])
 end
 # Never trust parameters from the scary internet, only allow the white list through.
 def seller_params
 params.require(:seller).permit(:name, :address, :pay_type)
 end
end