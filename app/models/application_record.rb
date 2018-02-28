class ApplicationRecord < ActiveRecord::Base
 	self.abstract_class = true
  	ACCOUNT_TYPES=["Buyer", "Seller"]
 	attr_accessor :type
end
