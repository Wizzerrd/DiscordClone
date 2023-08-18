class UpdateMemberships < ActiveRecord::Migration[7.0]
  def change
    rename_column :memberships, :membership_id, :membershipable_id
    rename_column :memberships, :membership_type, :membershipable_type
    add_index :memberships, :membershipable_type
    add_index :memberships, :membershipable_id
    change_column_null :memberships, :membershipable_type, false
    change_column_null :memberships, :membershipable_id, false
  end
end
