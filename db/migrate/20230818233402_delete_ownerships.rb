class DeleteOwnerships < ActiveRecord::Migration[7.0]
  def change
    drop_table :ownerships
  end
end
