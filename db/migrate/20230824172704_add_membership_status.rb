class AddMembershipStatus < ActiveRecord::Migration[7.0]
  def change
    add_column :memberships, :accepted, :boolean, null: false
  end
end
