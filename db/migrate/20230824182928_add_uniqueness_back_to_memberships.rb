class AddUniquenessBackToMemberships < ActiveRecord::Migration[7.0]
  def change
    add_index :memberships, [:membershipable_id, :membershipable_type, :user_id], unique: true, name: 'triple_uniquester'
  end
end
