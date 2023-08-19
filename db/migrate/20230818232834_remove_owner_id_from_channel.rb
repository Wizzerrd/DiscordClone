class RemoveOwnerIdFromChannel < ActiveRecord::Migration[7.0]
  def change
    remove_column :channels, :owner_id
  end
end
