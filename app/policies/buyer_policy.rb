class BuyerPolicy
 attr_reader :current_account, :model
 def initialize(current_account, model)
 @current_account = current_account
 @buyer = model
 end
 def edit?
 @current_account == @buyer.account
 end
 def update?
 @current_account == @buyer.account
 end
end