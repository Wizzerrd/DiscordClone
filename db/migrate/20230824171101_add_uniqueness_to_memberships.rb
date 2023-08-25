class AddUniquenessToMemberships < ActiveRecord::Migration[7.0]
  def change
    remove_index :memberships, name: "index_memberships_on_membershipable_id"
    remove_index :memberships, name: "index_memberships_on_membership"
    remove_index :memberships, name: "index_memberships_on_membershipable_type"
    remove_index :memberships, name: "index_memberships_on_user_id"
    
    add_index :memberships, :membershipable_id, unique: {scope: [:user_id, :membershipable_type]}
  end
end


