class Cart < ApplicationRecord
	has_many :line_items, dependent: :destroy

	def add_product(product)
		current_item = line_items.find_by(product_id: product.id)
		print "HERE"
		if current_item
			current_item.quantity += 1
			print "INCREASED!"
		else
			current_item = line_items.build(product_id: product.id)
		end
		current_item
	end
	
	def total_price
		line_items.to_a.sum { |item| item.total_price }
	end
end
