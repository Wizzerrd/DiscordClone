class CreateOwnerships < ActiveRecord::Migration[7.0]
  def change
    create_table :ownerships do |t|
      t.references :ownershipable, polymorphic: true, null: false
      t.references :owner_id, foreign_key:{to_table: :users}, null: false
      t.timestamps
    end
    remove_column :servers, :owner_id
  end
end
